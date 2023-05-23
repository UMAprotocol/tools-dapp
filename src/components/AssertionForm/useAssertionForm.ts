import {
  challengePeriods,
  currenciesByChain,
  oov3AddressesByChainId,
} from "@/constants";
import { useMinimumBond } from "@/hooks";
import type { ChainId, DropdownItem } from "@/types";
import { useEffect, useState } from "react";
import { parseUnits } from "viem";
import { useAccount, useNetwork, useToken } from "wagmi";

export type AssertionFormProps = ReturnType<typeof useAssertionForm>;

export function useAssertionForm() {
  const { address: userAddress } = useAccount();
  const { chain } = useNetwork();
  const chainId = (chain?.id ?? 1) as ChainId;
  const { WETH, DAI, USDC } = currenciesByChain[chainId] ?? {};
  const { data: weth } = useToken({ address: WETH });
  const { data: dai } = useToken({ address: DAI });
  const { data: usdc } = useToken({ address: USDC });
  const currencies = { weth, dai, usdc };
  const [claim, setClaim] = useState("");
  const [bond, setBond] = useState("1");
  const [bondError, setBondError] = useState("");
  const [challengePeriod, setChallengePeriod] = useState<DropdownItem>(
    challengePeriods[2]
  );
  const currencyOptions = Object.entries(currencies)
    .map(([currency, details]) =>
      !!details
        ? {
            value: currency,
            label: `${details.name} - (${details.symbol})`,
          }
        : undefined
    )
    .filter(Boolean);
  const [currency, setCurrency] = useState(currencyOptions[0]);

  const selectedCurrency = currencyOptions.find(
    (c) => c?.value === currency?.value
  );

  const currencyDetails =
    currencies[selectedCurrency?.value as keyof typeof currencies];

  const currencyAddress = currencyDetails?.address;

  const oracleAddress = oov3AddressesByChainId[chainId];

  const minimumBond = useMinimumBond({ currencyAddress, oracleAddress });
  const decimals = currencyDetails?.decimals ?? 18;
  const currencySymbol = currencyDetails?.symbol ?? "??";
  const bondBigInt = BigInt(parseUnits(bond as `${number}`, decimals));
  const challengePeriodBigInt = BigInt(challengePeriod.value);
  useEffect(() => {
    if (!currencyDetails?.symbol || !minimumBond) return;
    if (BigInt(bond) < minimumBond) {
      setBondError(
        `Bond must be at least ${minimumBond} ${currencyDetails.symbol}`
      );
    } else {
      setBondError("");
    }
  }, [minimumBond, bond, currencyDetails?.symbol]);

  return {
    currencyOptions,
    selectedCurrency,
    challengePeriods,
    claim,
    chainId,
    currency,
    userAddress,
    currencyAddress,
    oracleAddress,
    decimals,
    bond,
    bondBigInt,
    challengePeriod,
    challengePeriodBigInt,
    setClaim,
    setCurrency,
    setBond,
    bondError,
    setBondError,
    setChallengePeriod,
    currencySymbol,
    currencyDetails,
  };
}
