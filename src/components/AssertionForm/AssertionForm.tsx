"use client";

import {
  challengePeriods,
  currenciesByChain,
  oov3AddressesByChainId,
} from "@/constants";
import { useMinimumBond } from "@/hooks";
import type { ChainId, DropdownItem } from "@/types";
import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { useAccount, useNetwork, useToken } from "wagmi";
import styles from "./AssertionForm.module.css";
import { Form } from "./Form";
import { Preview } from "./Preview";

export function AssertionForm() {
  const isClient = useIsClient();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = (chain?.id ?? 1) as ChainId;
  const { WETH, DAI, USDC } = currenciesByChain[chainId] ?? {};
  const { data: weth } = useToken({ address: WETH });
  const { data: dai } = useToken({ address: DAI });
  const { data: usdc } = useToken({ address: USDC });
  const currencies = { weth, dai, usdc };
  const [claim, setClaim] = useState("");
  const [bond, setBond] = useState("10000");
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

  console.log({ minimumBond, bond });

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

  const formProps = {
    currencyOptions,
    selectedCurrency,
    challengePeriods,
    claim,
    chainId,
    currency,
    address,
    currencyAddress,
    oracleAddress,
    decimals: currencyDetails?.decimals ?? 18,
    bond,
    challengePeriod,
    setClaim,
    setCurrency,
    setBond,
    bondError,
    setBondError,
    setChallengePeriod,
  };

  const previewProps = {
    claim,
    currency: selectedCurrency?.value?.toUpperCase(),
    bond,
    challengePeriod: challengePeriod?.label,
    currencyDetails,
  };

  if (!isClient) return null;

  return (
    <div className={styles.wrapper}>
      <Form {...formProps} />
      <Preview {...previewProps} />
    </div>
  );
}
