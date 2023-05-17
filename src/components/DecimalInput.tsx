import type { ChangeEvent } from "react";
import styles from "./DecimalInput.module.css";

type DecimalInput = {
  onInput: (value: string) => void;
  addErrorMessage: (errorMessage: string) => void;
  removeErrorMessage: (errorMessage: string) => void;
  maxDecimals: number;
  allowNegative: boolean;
};
/**
 * This hook is used to handle decimal inputs. It will add an error message if the user tries to enter a number with more than the specified number of decimals, or if the user tries to enter a negative number when `allowNegative` is set to false.
 * @param onInput A callback function that is called with the input value as a string.
 * @param addErrorMessage A callback function that is called with an error message to add to the error message array.
 * @param removeErrorMessage A callback function that is called with an error message to remove from the error message array.
 * @param maxDecimals The maximum number of decimals allowed.
 * @param allowNegative Whether or not to allow negative numbers.
 * @returns A function that should be called on the `onChange` event of the input.
 */
export function useHandleDecimalInput({
  onInput,
  addErrorMessage,
  removeErrorMessage,
  maxDecimals,
  allowNegative,
}: DecimalInput) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const noNegativeNumbersErrorMessage = "Negative numbers are not allowed";

    if (!allowNegative && value.includes("-")) {
      addErrorMessage(noNegativeNumbersErrorMessage);
      return;
    }

    const decimalsErrorMessage = `Cannot have more than ${maxDecimals} decimals.`;
    const negativeAllowedDecimalRegex = /^-?\d*\.?\d{0,}$/;
    const onlyPositiveDecimalsRegex = /^\d*\.?\d{0,}$/;
    const decimalsRegex = allowNegative
      ? negativeAllowedDecimalRegex
      : onlyPositiveDecimalsRegex;
    const isValidDecimalNumber = decimalsRegex.test(value);

    if (!isValidDecimalNumber) return;

    const hasDecimals = value.includes(".");

    if (hasDecimals) {
      const decimals = value.split(".")[1];
      const hasTooManyDecimals = decimals.length > maxDecimals;
      if (hasTooManyDecimals) {
        addErrorMessage(decimalsErrorMessage);
        return;
      }
    }

    removeErrorMessage(decimalsErrorMessage);
    onInput(value);
  };
}

interface Props {
  value: string;
  onInput: (value: string) => void;
  onClear?: () => void;
  addErrorMessage: (message: string) => void;
  removeErrorMessage: () => void;
  disabled?: boolean;
  placeholder?: string;
  maxDecimals?: number;
  allowNegative?: boolean;
}
/**
 * A component for entering decimal values.
 * @param value The current value of the input.
 * @param onInput A callback to be called when the input value changes.
 * @param addErrorMessage A callback to be called when an error message should be displayed.
 * @param removeErrorMessage A callback to be called when an error message should be removed.
 * @param disabled Whether the input should be disabled.
 * @param placeholder The placeholder text to display when the input is empty.
 * @param maxDecimals The maximum number of decimal places to allow.
 * @param allowNegative Whether to allow negative values.
 */
export function DecimalInput({
  value,
  onInput,
  addErrorMessage,
  removeErrorMessage,
  disabled,
  placeholder,
  maxDecimals = 18,
  allowNegative = true,
}: Props) {
  const onChange = useHandleDecimalInput({
    onInput,
    addErrorMessage,
    removeErrorMessage,
    maxDecimals,
    allowNegative,
  });

  function makeStep() {
    return `0.${"0".repeat(maxDecimals - 1)}1`;
  }

  return (
    <input
      value={value ?? undefined}
      onChange={onChange}
      type="number"
      step={makeStep()}
      disabled={disabled}
      autoComplete="off"
      autoCorrect="off"
      placeholder={placeholder ?? "Enter value"}
      minLength={1}
      maxLength={79}
      spellCheck="false"
      className={styles.input}
    />
  );
}
