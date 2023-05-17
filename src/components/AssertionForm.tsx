import { DecimalInput, InfoIcon, RadioDropdown, TextArea } from "@/components";
import type { DropdownItem } from "@/types";
import { useState } from "react";

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
  const [assertionStatement, setAssertionStatement] = useState("");
  const [currency, setCurrency] = useState<DropdownItem>();
  const [bond, setBond] = useState("");
  const [bondError, setBondError] = useState("");
  const [challengePeriod, setChallengePeriod] = useState<DropdownItem>();

  return (
    <form>
      <div>
        <label htmlFor="assertion-statement">
          Assertion Statement{" "}
          <InfoIcon>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum,
            labore.
          </InfoIcon>
        </label>
        <TextArea
          id="assertion-statement"
          value={assertionStatement}
          onChange={(e) => setAssertionStatement(e.target.value)}
          placeholder="I assert that..."
        />
      </div>
      <div>
        <label htmlFor="currency">
          Currency:{" "}
          <InfoIcon>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            impedit distinctio amet eligendi sit possimus suscipit totam illum
          </InfoIcon>
        </label>
        <RadioDropdown
          id="currency"
          items={currencies}
          selected={currency}
          onSelect={setCurrency}
        />
      </div>
      <div>
        <label htmlFor="bond">
          Bond Amount:{" "}
          <InfoIcon>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            impedit distinctio amet eligendi sit possimus suscipit totam illum
          </InfoIcon>
        </label>
        <DecimalInput
          id="bond"
          value={bond}
          onInput={setBond}
          addErrorMessage={setBondError}
          removeErrorMessage={() => setBondError("")}
        />
        <p>{bondError}</p>
      </div>
      <div>
        <label htmlFor="challenge-period">
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
    </form>
  );
}
