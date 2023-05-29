import { DecimalInput, InfoIcon, RadioDropdown, TextArea } from "@/components";
import { chainsById } from "@/constants";
import { formatUnits } from "viem";
import { ActionButton } from "./ActionButton/ActionButton";
import styles from "./Form.module.css";
import type { AssertionFormProps } from "./useAssertionForm";

export function Form(props: AssertionFormProps) {
  const {
    claim,
    claimError,
    currencies,
    currency,
    challengePeriods,
    challengePeriod,
    userAddress,
    currencyAddress,
    oracleAddress,
    decimals,
    minimumBond,
    currencySymbol,
    chainId,
    bond,
    bondInputError,
    bondIsTooLow,
    setClaim,
    setBond,
    setBondError,
    setCurrency,
    setChallengePeriod,
  } = props;
  const chainName = chainsById[chainId];
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.inputWrapper}>
        <label htmlFor="claim" className={styles.label}>
          Assertion Claim:{" "}
          <InfoIcon>Assert that something in the world is true.</InfoIcon>
        </label>
        <TextArea
          id="claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="I assert that..."
        />
        {claimError !== "" && <p className={styles.error}>{claimError}</p>}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="currency" className={styles.label}>
          Currency:{" "}
          <InfoIcon>Choose the currency you want to use for the bond.</InfoIcon>
        </label>
        <RadioDropdown
          id="currency"
          items={currencies}
          selected={currency}
          onSelect={setCurrency}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="bond" className={styles.label}>
          Bond Amount:{" "}
          <InfoIcon>
            The amount of currency you are willing to stake on this assertion.
          </InfoIcon>
        </label>
        <DecimalInput
          id="bond"
          value={bond}
          maxDecimals={decimals}
          allowNegative={false}
          required={true}
          onInput={setBond}
          addErrorMessage={setBondError}
          removeErrorMessage={() => setBondError("")}
        />
        {bondInputError !== "" && (
          <p className={styles.error}>{bondInputError}</p>
        )}
        {bondIsTooLow && minimumBond !== undefined && (
          <p className={styles.error}>
            Bond must be at least {formatUnits(minimumBond, decimals)}{" "}
            {currencySymbol} on {chainName}
          </p>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="challenge-period" className={styles.label}>
          Challenge Period:{" "}
          <InfoIcon>
            The amount of time challengers have to dispute your assertion.
          </InfoIcon>
        </label>
        <RadioDropdown
          id="challenge-period"
          items={challengePeriods}
          selected={challengePeriod}
          onSelect={setChallengePeriod}
        />
      </div>
      {!!decimals &&
        !!userAddress &&
        !!currencyAddress &&
        !!oracleAddress &&
        !bondInputError &&
        !bondIsTooLow && (
          <ActionButton
            {...props}
            userAddress={userAddress}
            currencyAddress={currencyAddress}
          />
        )}
    </form>
  );
}
