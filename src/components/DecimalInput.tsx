import type { ChangeEvent, ComponentPropsWithoutRef } from "react";
import styles from "./DecimalInput.module.css";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "onInput">;

type DecimalInput = {
  onInput: (value: string) => void;
  addErrorMessage: (errorMessage: string) => void;
  removeErrorMessage: (errorMessage: string) => void;
  maxDecimals?: number;
  allowNegative?: boolean;
  required?: boolean;
  requiredErrorMessage?: string;
};
export function useHandleDecimalInput({
  onInput,
  addErrorMessage,
  removeErrorMessage,
  maxDecimals = 18,
  allowNegative = true,
  required,
  requiredErrorMessage,
}: DecimalInput) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (required && value === "") {
      onInput(value);
      addErrorMessage(requiredErrorMessage ?? "This field is required");
      return;
    }

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

type Props = InputProps & DecimalInput;
export function DecimalInput({
  value,
  onInput,
  addErrorMessage,
  removeErrorMessage,
  disabled,
  placeholder,
  maxDecimals = 18,
  allowNegative = true,
  required,
  requiredErrorMessage,
  id,
  ...delegated
}: Props) {
  const onChange = useHandleDecimalInput({
    onInput,
    addErrorMessage,
    removeErrorMessage,
    maxDecimals,
    allowNegative,
    required,
    requiredErrorMessage,
  });

  function makeStep() {
    return `0.${"0".repeat(maxDecimals - 1)}1`;
  }

  return (
    <input
      {...delegated}
      value={value}
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
      className={`${styles.input} ${delegated.className ?? ""}`}
      id={id}
      required={required}
    />
  );
}
