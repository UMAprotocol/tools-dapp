import type { DropdownItem } from "@/types";
import { useState } from "react";
import styles from "./AssertionForm.module.css";
import { Form } from "./Form";
import { Preview } from "./Preview";

export function AssertionForm() {
  const currencies = [
    { label: "USDC", value: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
    { label: "DAI", value: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
  ];
  const challengePeriods = [
    { label: "30 minutes", value: "1800000" },
    { label: "1 hour", value: "3600000" },
    { label: "2 hours", value: "7200000" },
    { label: "6 hours", value: "21600000" },
    { label: "12 hours", value: "43200000" },
    { label: "1 day", value: "86400000" },
  ];
  const [statement, setStatement] = useState("");
  const [currency, setCurrency] = useState<DropdownItem>();
  const [bond, setBond] = useState("");
  const [bondError, setBondError] = useState("");
  const [challengePeriod, setChallengePeriod] = useState<DropdownItem>();

  function onSubmit() {
    return;
  }

  const formProps = {
    currencies,
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
    currency: currency?.label,
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
