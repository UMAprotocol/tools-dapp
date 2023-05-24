import { oov3Abi } from "@/abis";
import { Button, Tooltip } from "@/components";
import { stringToHex, zeroAddress } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import type { ActionButtonProps } from "./ActionButton";

export function SubmitButton(props: ActionButtonProps) {
  const { disabled, submitAssertion, tooltipContent } = useSubmitButton(props);
  return (
    <Tooltip content={tooltipContent}>
      <Button disabled={disabled} onClick={submitAssertion}>
        <span>Submit</span>
      </Button>
    </Tooltip>
  );
}

function useSubmitButton(props: ActionButtonProps) {
  const {
    claim,
    bondBigInt,
    challengePeriodBigInt,
    insufficientFunds,
    balance,
    bondFormatted,
    userAddress,
    currencyAddress,
    currencySymbol,
    oracleAddress,
  } = props;
  const hasClaim = claim.length > 0;
  const balanceFormatted = balance?.formatted ?? "0";
  const disabled = !hasClaim || insufficientFunds;

  const { config } = usePrepareContractWrite({
    address: oracleAddress,
    abi: oov3Abi,
    functionName: "assertTruth",
    args: [
      stringToHex(claim, { size: 32 }),
      userAddress,
      zeroAddress,
      zeroAddress,
      challengePeriodBigInt,
      currencyAddress,
      bondBigInt,
      stringToHex("ASSERT_TRUTH", { size: 32 }),
      stringToHex("0x0", { size: 32 }),
    ],
  });

  const { write } = useContractWrite(config);

  const tooltipContent = getTooltipContent();

  function getTooltipContent() {
    if (!hasClaim) {
      return "Please enter a claim to submit";
    }
    if (insufficientFunds) {
      return `Insufficient funds. You have ${balanceFormatted} ${currencySymbol} but need ${bondFormatted} ${currencySymbol}.`;
    }
    return undefined;
  }

  return {
    ...props,
    disabled,
    tooltipContent,
    submitAssertion: () => write?.(),
  };
}
