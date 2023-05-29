import { DecimalInput, InfoIcon, RadioDropdown, TextArea } from "@/components";
import styles from "./Form.module.css";
import { FormButton } from "./FormButton";
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
    isConnected,
    currencyAddress,
    decimals,
    bond,
    bondInputError,
    bondIsTooLowError,
    errors,
    setClaim,
    setBond,
    setBondError,
    setCurrency,
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
        {!!bondInputError && <p className={styles.error}>{bondInputError}</p>}
        {!!bondIsTooLowError && (
          <p className={styles.error}>{bondIsTooLowError}</p>
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
      <div
        style={{
          width: "fit-content",
          marginLeft: "auto",
        }}
      >
        <FormButton
          delegatedProps={props}
          isConnected={isConnected}
          userAddress={userAddress}
          currencyAddress={currencyAddress}
          errors={errors}
        />
      </div>
    </form>
  );
}
