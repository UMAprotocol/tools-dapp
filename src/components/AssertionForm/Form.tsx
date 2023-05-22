import { DecimalInput, InfoIcon, RadioDropdown, TextArea } from "@/components";
import { ActionButton } from "./ActionButton";
import styles from "./Form.module.css";
import type { AssertionFormProps } from "./useAssertionForm";

export function Form(props: AssertionFormProps) {
  const {
    currencyOptions,
    challengePeriods,
    claim,
    setClaim,
    userAddress,
    selectedCurrency,
    currencyAddress,
    oracleAddress,
    setCurrency,
    decimals,
    bond,
    setBond,
    bondError,
    setBondError,
    challengePeriod,
    setChallengePeriod,
  } = props;
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
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="currency" className={styles.label}>
          Currency:{" "}
          <InfoIcon>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            impedit distinctio amet eligendi sit possimus suscipit totam illum
          </InfoIcon>
        </label>
        <RadioDropdown
          id="currency"
          items={currencyOptions}
          selected={selectedCurrency}
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
          onInput={setBond}
          addErrorMessage={setBondError}
          removeErrorMessage={() => setBondError("")}
        />
        <p className={styles.bondError}>{bondError}</p>
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
        !bondError && (
          <ActionButton
            {...props}
            userAddress={userAddress}
            currencyAddress={currencyAddress}
          />
        )}
    </form>
  );
}
