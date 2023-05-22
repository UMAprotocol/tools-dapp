import {
  Button,
  DecimalInput,
  InfoIcon,
  RadioDropdown,
  TextArea,
} from "@/components";
import type { DropdownItem } from "@/types";
import styles from "./Form.module.css";

interface Props {
  currencyOptions: DropdownItem[];
  selectedCurrency: DropdownItem | undefined;
  decimals: number;
  challengePeriods: DropdownItem[];
  statement: string;
  setStatement: (statement: string) => void;
  setCurrency: (currency: DropdownItem) => void;
  bond: string;
  setBond: (bond: string) => void;
  bondError: string;
  setBondError: (bondError: string) => void;
  challengePeriod: DropdownItem | undefined;
  setChallengePeriod: (challengePeriod: DropdownItem) => void;
  onSubmit: () => void;
}
export function Form({
  currencyOptions,
  challengePeriods,
  statement,
  setStatement,
  selectedCurrency,
  setCurrency,
  decimals,
  bond,
  setBond,
  bondError,
  setBondError,
  challengePeriod,
  setChallengePeriod,
  onSubmit,
}: Props) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputWrapper}>
        <label htmlFor="statement" className={styles.label}>
          Assertion Statement:{" "}
          <InfoIcon>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum,
            labore.
          </InfoIcon>
        </label>
        <TextArea
          id="statement"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="I assert that..."
        />
      </div>
      {true && (
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
      )}
      <div className={styles.inputWrapper}>
        <label htmlFor="bond" className={styles.label}>
          Bond Amount:{" "}
          <InfoIcon>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            impedit distinctio amet eligendi sit possimus suscipit totam illum
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            impedit distinctio amet eligendi sit possimus suscipit totam illum
          </InfoIcon>
        </label>
        <RadioDropdown
          id="challenge-period"
          items={challengePeriods}
          selected={challengePeriod}
          onSelect={setChallengePeriod}
        />
      </div>
      <Button
        type="submit"
        style={{
          marginLeft: "auto",
        }}
      >
        Submit
      </Button>
    </form>
  );
}
