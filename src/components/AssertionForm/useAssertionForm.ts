import {
  chainsById,
  challengePeriods,
  currenciesByChain,
  oov3AddressesByChainId,
} from "@/constants";
import { useMinimumBond } from "@/hooks";
import type { ChainId, DropdownItem } from "@/types";
import { useEffect, useState } from "react";
import { useUpdateEffect } from "usehooks-ts";
import type { Address } from "viem";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useNetwork, useToken } from "wagmi";

export type AssertionFormProps = ReturnType<typeof useAssertionForm>;

export function useAssertionForm() {
  const { address: userAddress, isConnected } = useAccount();
  const { chain } = useNetwork();
  const chainId = (chain?.id ?? 1) as ChainId;

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
  const currenciesData = { weth, dai, usdc };
  const [claim, setClaim] = useState("I assert that...");
  const [claimError, setClaimError] = useState("");
  const [bond, setBond] = useState("1");
  const [bondInputError, setBondInputError] = useState("");
  const [bondIsTooLow, setBondIsTooLow] = useState(false);
  const [challengePeriod, setChallengePeriod] = useState<DropdownItem>(
    challengePeriods[2]
  );
  // data for currencies is async, so we set it when its available (see useEffect below)
  const [currency, setCurrency] = useState<DropdownItem>();
  const currencies = makeCurrencyDropdownOptions();
  const currencyDetails =
    currenciesData[currency?.value as keyof typeof currenciesData];
  const currencyAddress = currencyDetails?.address;
  const oracleAddress = oov3AddressesByChainId[chainId];

  const minimumBond = useMinimumBond({ currencyAddress, oracleAddress });
  const decimals = currencyDetails?.decimals ?? 18;
  const currencySymbol = currencyDetails?.symbol ?? "";
  const bondBigInt = BigInt(parseUnits(bond as `${number}`, decimals));
  const bondFormatted = formatUnits(bondBigInt, decimals);
  const challengePeriodBigInt = BigInt(challengePeriod.value);
  const chainName = chainsById[chainId];
  const bondIsTooLowError =
    bondIsTooLow && minimumBond !== undefined
      ? `Bond must be at least ${formatUnits(minimumBond, decimals)} 
  ${currencySymbol} on ${chainName}`
      : undefined;
  const errors = [claimError, bondInputError, bondIsTooLowError].filter(
    Boolean
  );

  useEffect(() => {
    if (minimumBond !== undefined && bondBigInt < minimumBond) {
      setBondIsTooLow(true);
      return;
    }
    setBondIsTooLow(false);
  }, [bondBigInt, minimumBond]);

  useEffect(() => {
    if (!!currencies && !currency) {
      setCurrency(currencies[0]);
    }
  }, [currencies, currency]);

  useUpdateEffect(() => {
    if (claim === "") {
      setClaimError("Claim is required");
      return;
    }
    setClaimError("");
  }, [claim]);

  // only weth is supported on goerli, so switch to it if the user is on goerli
  useEffect(() => {
    if (chainId === 5) {
      setCurrency(currencies[0]);
    }
  }, [chainId, currencies]);

  function makeCurrencyDropdownOptions() {
    return Object.entries(currenciesData)
      .map(([currency, details]) =>
        !!details
          ? {
              value: currency,
              label: `${details.name} - (${details.symbol})`,
            }
          : undefined
      )
      .filter(Boolean);
  }

  return {
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
    userAddress,
    isConnected,
    currencyAddress,
    oracleAddress,
    errors,
    setClaim,
    setCurrency,
    setBond,
    setBondError: setBondInputError,
    setChallengePeriod,
  };
}
