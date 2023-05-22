import { DecimalInput, InfoIcon, RadioDropdown, TextArea } from "@/components";
import type { ChainId, DropdownItem } from "@/types";
import { parseUnits } from "viem";
import type { Address } from "wagmi";
import { ActionButton } from "./ActionButton";
import styles from "./Form.module.css";

interface Props {
  currencyOptions: DropdownItem[];
  selectedCurrency: DropdownItem | undefined;
  address: Address | undefined;
  decimals: number;
  currencyAddress: Address | undefined;
  chainId: ChainId;
  challengePeriods: DropdownItem[];
  claim: string;
  setClaim: (claim: string) => void;
  setCurrency: (currency: DropdownItem) => void;
  bond: string;
  setBond: (bond: string) => void;
  bondError: string;
  setBondError: (bondError: string) => void;
  challengePeriod: DropdownItem | undefined;
  setChallengePeriod: (challengePeriod: DropdownItem) => void;
}
export function Form({
  currencyOptions,
  challengePeriods,
  claim,
  setClaim,
  chainId,
  address,
  selectedCurrency,
  currencyAddress,
  setCurrency,
  decimals,
  bond,
  setBond,
  bondError,
  setBondError,
  challengePeriod,
  setChallengePeriod,
}: Props) {
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
      {!!decimals && !!address && !!currencyAddress && (
        <ActionButton
          userAddress={address}
          claim={claim}
          bond={BigInt(parseUnits(bond.toString() as `${number}`, decimals))}
          decimals={decimals}
          currencyAddress={currencyAddress}
          chainId={chainId}
        />
      )}
    </form>
  );
}
