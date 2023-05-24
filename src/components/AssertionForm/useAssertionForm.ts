import {
  challengePeriods,
  currenciesByChain,
  oov3AddressesByChainId,
} from "@/constants";
import { useMinimumBond } from "@/hooks";
import type { ChainId, DropdownItem } from "@/types";
import { useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
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
  const currenciesData = { weth, dai, usdc };
  const [claim, setClaim] = useState("");
  const [bond, setBond] = useState("1");
  const [bondError, setBondError] = useState("");
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

  useEffect(() => {
    if (!currencyDetails?.symbol || !minimumBond) return;
    if (bondBigInt < minimumBond) {
      setBondError(
        `Bond must be at least ${formatUnits(minimumBond, decimals)} ${
          currencyDetails.symbol
        }`
      );
    } else {
      setBondError("");
    }
  }, [minimumBond, bond, currencyDetails?.symbol, bondBigInt, decimals]);

  useEffect(() => {
    if (!!currencies && !currency) {
      setCurrency(currencies[0]);
    }
  }, [currencies, currency]);

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
    claim,
    currencies,
    challengePeriods,
    challengePeriod,
    challengePeriodBigInt,
    currency,
    currencySymbol,
    currencyDetails,
    decimals,
    bond,
    bondBigInt,
    bondFormatted,
    bondError,
    userAddress,
    currencyAddress,
    oracleAddress,
    setClaim,
    setCurrency,
    setBond,
    setBondError,
    setChallengePeriod,
  };
}
