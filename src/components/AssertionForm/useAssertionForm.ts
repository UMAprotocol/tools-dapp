import {
  chainsById,
  challengePeriods,
  currenciesByChain,
  oov3AddressesByChainId,
} from "@/constants";
import { truncateDecimalString } from "@/helpers";
import { useBalanceAndAllowance, useMinimumBond } from "@/hooks";
import type { ChainId, ChainName, DropdownItem } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useUpdateEffect } from "usehooks-ts";
import type { Address } from "viem";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useNetwork, useToken } from "wagmi";

export type AssertionFormProps = ReturnType<typeof useAssertionForm>;

function useChain() {
  const { chain } = useNetwork();
  const chainId = (chain?.id ?? 1) as ChainId;
  const chainName = chainsById[chainId];
  const oracleAddress = oov3AddressesByChainId[chainId];

  return useMemo(
    () => ({ chainId, chainName, oracleAddress }),
    [chainId, chainName, oracleAddress]
  );
}

function useCurrency({ chainId }: { chainId: ChainId }) {
  // data for currencyDropdownOptions is async, so we set it when its available (see useEffect below)
  const [currency, setCurrency] = useState<DropdownItem>();
  const { WETH, DAI, USDC } = currenciesByChain[chainId] ?? {};
  const { data: weth } = useToken({
    address: WETH as Address,
    enabled: !!WETH,
  });
  const { data: dai } = useToken({
    address: DAI as Address,
    enabled: !!DAI,
  });
  const { data: usdc } = useToken({
    address: USDC as Address,
    enabled: !!USDC,
  });

  const currenciesWithTokenData = useMemo(
    () => ({ weth, dai, usdc }),
    [dai, usdc, weth]
  );

  const currencyDropdownOptions = useMemo(
    () =>
      Object.entries(currenciesWithTokenData)
        .map(([currency, details]) =>
          !!details
            ? {
                value: currency,
                label: `${details.name} - (${details.symbol})`,
              }
            : undefined
        )
        .filter(Boolean),
    [currenciesWithTokenData]
  );

  const currencyDetails =
    currenciesWithTokenData[
      currency?.value as keyof typeof currenciesWithTokenData
    ];
  const currencyAddress = currencyDetails?.address;
  const decimals = currencyDetails?.decimals ?? 18;
  const currencySymbol = currencyDetails?.symbol ?? "";

  useEffect(() => {
    if (!!currencyDropdownOptions && !currency) {
      setCurrency(currencyDropdownOptions[0]);
    }
  }, [currencyDropdownOptions, currency]);

  // only weth is supported on goerli, so switch to it if the user is on goerli
  useEffect(() => {
    if (currency && !currencyDropdownOptions.includes(currency)) {
      setCurrency(currencyDropdownOptions[0]);
    }
  }, [currency, currencyDropdownOptions]);

  return useMemo(
    () => ({
      currencies: currencyDropdownOptions,
      currency,
      setCurrency,
      currencyAddress,
      currencyDetails,
      currencySymbol,
      decimals,
    }),
    [
      currency,
      currencyAddress,
      currencyDetails,
      currencyDropdownOptions,
      currencySymbol,
      decimals,
    ]
  );
}

function useClaim() {
  const [claim, setClaim] = useState("I assert that...");
  const [claimError, setClaimError] = useState("");

  useUpdateEffect(() => {
    if (claim === "") {
      setClaimError("Claim is required");
      return;
    }
    setClaimError("");
  }, [claim]);

  return useMemo(
    () => ({ claim, setClaim, claimError }),
    [claim, claimError, setClaim]
  );
}

function useChallengePeriod() {
  const [challengePeriod, setChallengePeriod] = useState<DropdownItem>(
    challengePeriods[2]
  );
  const challengePeriodBigInt = BigInt(challengePeriod.value);

  return useMemo(
    () => ({ challengePeriod, setChallengePeriod, challengePeriodBigInt }),
    [challengePeriod, challengePeriodBigInt]
  );
}

function useWalletState({
  currencyAddress,
  oracleAddress,
  chainId,
}: {
  currencyAddress: Address | undefined;
  oracleAddress: Address;
  chainId: ChainId;
}) {
  const { address: userAddress, isConnected } = useAccount();
  const { balance, allowance } = useBalanceAndAllowance({
    userAddress,
    currencyAddress,
    oracleAddress,
    chainId,
  });
  const balanceFormatted = truncateDecimalString(balance?.formatted ?? "0");

  return useMemo(
    () => ({
      userAddress,
      isConnected,
      balance: balance?.value ?? BigInt(0),
      allowance: allowance ?? BigInt(0),
      balanceFormatted,
    }),
    [userAddress, isConnected, balance, allowance, balanceFormatted]
  );
}

function useBond({
  balance,
  balanceFormatted,
  allowance,
  currencyAddress,
  currencySymbol,
  chainName,
  oracleAddress,
  decimals,
}: {
  balance: bigint;
  balanceFormatted: string;
  allowance: bigint;
  currencyAddress: Address | undefined;
  currencySymbol: string;
  chainName: ChainName;
  oracleAddress: Address;
  decimals: number;
}) {
  const [bond, setBond] = useState("1");
  const [bondInputError, setBondInputError] = useState("");
  const [bondIsTooLow, setBondIsTooLow] = useState(false);
  const minimumBond = useMinimumBond({ currencyAddress, oracleAddress });
  const bondBigInt = BigInt(parseUnits(bond as `${number}`, decimals));
  const bondFormatted = formatUnits(bondBigInt, decimals);
  const hasApproved = !!allowance && allowance >= bondBigInt;
  const insufficientFunds = balance <= bondBigInt;
  const bondIsTooLowError =
    bondIsTooLow && minimumBond !== undefined
      ? `Bond must be at least ${formatUnits(minimumBond, decimals)} 
${currencySymbol} on ${chainName}`
      : undefined;
  const insufficientFundsError = insufficientFunds
    ? `Insufficient funds. You have ${balanceFormatted} ${currencySymbol}`
    : undefined;

  useEffect(() => {
    if (minimumBond !== undefined && bondBigInt < minimumBond) {
      setBondIsTooLow(true);
      return;
    }
    setBondIsTooLow(false);
  }, [bondBigInt, minimumBond]);

  return useMemo(
    () => ({
      bond,
      bondBigInt,
      bondFormatted,
      minimumBond,
      setBond,
      bondInputError,
      setBondInputError,
      bondIsTooLow,
      hasApproved,
      insufficientFunds,
      bondIsTooLowError,
      insufficientFundsError,
    }),
    [
      bond,
      bondBigInt,
      bondFormatted,
      bondInputError,
      bondIsTooLow,
      bondIsTooLowError,
      hasApproved,
      insufficientFunds,
      insufficientFundsError,
      minimumBond,
    ]
  );
}

export function useAssertionForm() {
  const { chainId, chainName, oracleAddress } = useChain();
  const { claim, setClaim, claimError } = useClaim();
  const { challengePeriod, setChallengePeriod, challengePeriodBigInt } =
    useChallengePeriod();
  const {
    currencies,
    currency,
    setCurrency,
    currencyAddress,
    currencyDetails,
    currencySymbol,
    decimals,
  } = useCurrency({ chainId });
  const { userAddress, isConnected, balance, allowance, balanceFormatted } =
    useWalletState({
      currencyAddress,
      oracleAddress,
      chainId,
    });
  const {
    bond,
    bondBigInt,
    bondFormatted,
    minimumBond,
    setBond,
    bondInputError,
    setBondInputError,
    bondIsTooLow,
    hasApproved,
    insufficientFunds,
    bondIsTooLowError,
    insufficientFundsError,
  } = useBond({
    balance,
    balanceFormatted,
    allowance,
    currencyAddress,
    currencySymbol,
    chainName,
    oracleAddress,
    decimals,
  });
  const errors = [
    claimError,
    bondInputError,
    bondIsTooLowError,
    insufficientFundsError,
  ].filter(Boolean);

  return useMemo(
    () => ({
      userAddress,
      chainId,
      chainName,
      claim,
      claimError,
      currencies,
      challengePeriods,
      challengePeriod,
      challengePeriodBigInt,
      currency,
      currencySymbol,
      currencyDetails,
      decimals,
      minimumBond,
      bond,
      bondBigInt,
      bondFormatted,
      bondInputError,
      bondIsTooLow,
      bondIsTooLowError,
      isConnected,
      currencyAddress,
      oracleAddress,
      errors,
      hasApproved,
      insufficientFunds,
      insufficientFundsError,
      setClaim,
      setCurrency,
      setBond,
      setBondInputError,
      setChallengePeriod,
    }),
    [
      bond,
      bondBigInt,
      bondFormatted,
      bondInputError,
      bondIsTooLow,
      bondIsTooLowError,
      chainId,
      chainName,
      challengePeriod,
      challengePeriodBigInt,
      claim,
      claimError,
      currencies,
      currency,
      currencyAddress,
      currencyDetails,
      currencySymbol,
      decimals,
      errors,
      hasApproved,
      insufficientFunds,
      insufficientFundsError,
      isConnected,
      minimumBond,
      oracleAddress,
      setBond,
      setBondInputError,
      setChallengePeriod,
      setClaim,
      setCurrency,
      userAddress,
    ]
  );
}
