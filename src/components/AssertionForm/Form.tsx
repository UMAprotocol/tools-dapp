import { DecimalInput, InfoIcon, RadioDropdown, TextArea } from "@/components";
import { makeTransparentColor } from "@/helpers";
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
    insufficientFundsError,
    errors,
    setClaim,
    setBond,
    setBondInputError,
    setCurrency,
    setChallengePeriod,
  } = props;

  type MaybeErrors = (string | undefined)[];

  function getInputStyle(...errors: MaybeErrors) {
    return {
      color: getInputTextColor(...errors),
      backgroundColor: getInputBackgroundColor(...errors),
      borderColor: getInputBorderColor(...errors),
    };
  }

  function getInputTextColor(...errors: MaybeErrors) {
    const normalTextColor = "var(--dark-text)";
    const errorTextColor = "var(--error-red)";

    return getMaybeErrorColor(
      {
        normalColor: normalTextColor,
        errorColor: errorTextColor,
      },
      ...errors
    );
  }

  function getInputBackgroundColor(...errors: MaybeErrors) {
    const normalBackgroundColor = "var(--white)";
    const errorBackgroundColor = makeTransparentColor("var(--error-red)", 0.05);

    return getMaybeErrorColor(
      {
        normalColor: normalBackgroundColor,
        errorColor: errorBackgroundColor,
      },
      ...errors
    );
  }

  function getInputBorderColor(...errors: MaybeErrors) {
    const normalBorderColor = "var(--dark-text)";
    const errorBorderColor = "var(--error-red)";

    return getMaybeErrorColor(
      {
        normalColor: normalBorderColor,
        errorColor: errorBorderColor,
      },
      ...errors
    );
  }

  function getInfoIconStyle(...errors: MaybeErrors) {
    const normalIconStrokeColor = "var(--dark-text)";
    const errorIconStrokeColor = "var(--error-red)";
    return {
      stroke: getMaybeErrorColor(
        {
          normalColor: normalIconStrokeColor,
          errorColor: errorIconStrokeColor,
        },
        ...errors
      ),
    };
  }

  function getMaybeErrorColor(
    { normalColor, errorColor }: { normalColor: string; errorColor: string },
    ...errors: MaybeErrors
  ) {
    return errors.some((e) => !!e && e.length !== 0) ? errorColor : normalColor;
  }

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.inputWrapper}>
        <label
          htmlFor="claim"
          className={styles.label}
          style={{
            color: getInputTextColor(claimError),
          }}
        >
          Assertion Claim:{" "}
          <InfoIcon style={getInfoIconStyle(claimError)}>
            Assert that something in the world is true.
          </InfoIcon>
        </label>
        <TextArea
          id="claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          required
          style={getInputStyle(claimError)}
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
        <label
          htmlFor="bond"
          className={styles.label}
          style={{
            color: getInputTextColor(
              bondInputError,
              bondIsTooLowError,
              insufficientFundsError
            ),
          }}
        >
          Bond Amount:{" "}
          <InfoIcon
            style={getInfoIconStyle(
              bondInputError,
              bondIsTooLowError,
              insufficientFundsError
            )}
          >
            The amount of currency you are willing to stake on this assertion.
          </InfoIcon>
        </label>
        <DecimalInput
          id="bond"
          value={bond}
          maxDecimals={decimals}
          allowNegative={false}
          required={true}
          requiredErrorMessage="You must have a bond to make an assertion"
          onInput={setBond}
          addErrorMessage={setBondInputError}
          placeholder=""
          removeErrorMessage={() => setBondInputError("")}
          style={getInputStyle(
            bondInputError,
            bondIsTooLowError,
            insufficientFundsError
          )}
        />
        {!!bondInputError && <p className={styles.error}>{bondInputError}</p>}
        {!!insufficientFundsError && (
          <p className={styles.error}>{insufficientFundsError}</p>
        )}
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
          {...props}
          isConnected={isConnected}
          userAddress={userAddress}
          currencyAddress={currencyAddress}
          errors={errors}
        />
      </div>
    </form>
  );
}
