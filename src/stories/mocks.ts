import type { AssertionFormProps } from "@/components/AssertionForm/useAssertionForm";
import { challengePeriods, oov3AddressesByChainId } from "@/constants";
import { zeroAddress } from "viem";

export const date = new Date("2023-05-01");

export const mockAssertionFormProps: AssertionFormProps = {
  userAddress: zeroAddress,
  chainId: 1,
  chainName: "Ethereum",
  claim: "",
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
  hasApproved: true,
  insufficientFunds: false,
  insufficientFundsError: undefined,
  setClaim: () => undefined,
  setCurrency: () => undefined,
  setBond: () => undefined,
  setBondInputError: () => undefined,
  setChallengePeriod: () => undefined,
};
