import { AssertionForm } from "@/components";
import type { AssertionFormProps } from "@/components/AssertionForm/useAssertionForm";
import { challengePeriods, oov3AddressesByChainId } from "@/constants";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import { MockWalletConfig } from "./MockWalletConfig";
import * as useAssertionForm from "@/components/AssertionForm/useAssertionForm";
import { zeroAddress } from "viem";

const meta: Meta = {
  component: AssertionForm,
};

export default meta;

type Story = StoryObj<typeof AssertionForm>;

const mockData: AssertionFormProps = {
  userAddress: zeroAddress,
  chainId: 1,
  chainName: "Ethereum",
  claim: "This is a claim",
  claimError: "",
  currencies: [{ label: "Wrapped Ether - (WETH)", value: "weth" }],
  challengePeriods,
  challengePeriod: challengePeriods[2],
  challengePeriodBigInt: BigInt(challengePeriods[2].value),
  currency: { label: "Wrapped Ether - (WETH)", value: "weth" },
  currencySymbol: "WETH",
  currencyDetails: {
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    decimals: 18,
    name: "Wrapped Ether",
    symbol: "WETH",
    totalSupply: {
      formatted: "12345.5678",
      value: 12345567800000000000000n,
    },
  },
  decimals: 18,
  minimumBond: 1000n,
  bond: "1000",
  bondBigInt: 1000n,
  bondFormatted: "1000",
  bondInputError: "",
  bondIsTooLow: false,
  bondIsTooLowError: undefined,
  isConnected: true,
  currencyAddress: "0x000000",
  oracleAddress: oov3AddressesByChainId[1],
  errors: [],
  hasApproved: false,
  insufficientFunds: false,
  insufficientFundsError: undefined,
  setClaim: () => undefined,
  setCurrency: () => undefined,
  setBond: () => undefined,
  setBondInputError: () => undefined,
  setChallengePeriod: () => undefined,
};

function makeUseAssertionFormMock() {
  return {
    moduleMock: {
      mock: () => {
        const mock = createMock(useAssertionForm, "useAssertionForm");
        mock.mockReturnValue(mockData);
      },
    },
  };
}

const Template: Story = {
  render: function Wrapper() {
    return (
      <MockWalletConfig>
        <AssertionForm />
      </MockWalletConfig>
    );
  },
};

export const Default = {
  ...Template,
  parameters: makeUseAssertionFormMock(),
};
