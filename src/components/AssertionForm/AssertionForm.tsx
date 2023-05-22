"use client";

import { challengePeriods, currenciesByChain } from "@/constants";
import type { DropdownItem } from "@/types";
import { useState } from "react";
import type { Address } from "wagmi";
import { useNetwork, useToken } from "wagmi";
import styles from "./AssertionForm.module.css";
import { Form } from "./Form";
import { Preview } from "./Preview";

export function AssertionForm() {
  const { chain } = useNetwork();
  const chainId = (chain?.id ?? 1) as keyof typeof currenciesByChain;
  const { WETH, DAI, USDC } = currenciesByChain[chainId] ?? {};
  const { data: weth } = useToken({ address: WETH as Address });
  const { data: dai } = useToken({ address: DAI as Address });
  const { data: usdc } = useToken({ address: USDC as Address });
  const currencies = { weth, dai, usdc };
  const [statement, setStatement] = useState("");
  const [bond, setBond] = useState("");
  const [bondError, setBondError] = useState("");
  const [challengePeriod, setChallengePeriod] = useState<DropdownItem>();
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
    (c) => c?.value === currency.value
  );

  function onSubmit() {
    return;
  }

  const formProps = {
    currencyOptions,
    selectedCurrency,
    challengePeriods,
    statement,
    currency,
    bond,
    challengePeriod,
    setStatement,
    setCurrency,
    setBond,
    bondError,
    setBondError,
    setChallengePeriod,
    onSubmit,
  };

  const previewProps = {
    statement,
    currency: selectedCurrency?.value?.toUpperCase(),
    bond,
    challengePeriod: challengePeriod?.label,
  };

  return (
    <div className={styles.wrapper}>
      <Form {...formProps} />
      <Preview {...previewProps} />
    </div>
  );
}
