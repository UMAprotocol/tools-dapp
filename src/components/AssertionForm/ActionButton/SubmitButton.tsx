import { oov3Abi } from "@/abis";
import { useNotifications } from "@/components";
import { useEffect } from "react";
import { stringToHex, zeroAddress } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { TooltipButton } from "../../TooltipButton";
import type { ActionButtonProps } from "./ActionButton";

export function SubmitButton(props: ActionButtonProps) {
  const { disabled, submitAssertion, tooltipContent } = useSubmitButton(props);
  return (
    <TooltipButton
      disabled={disabled}
      onClick={submitAssertion}
      tooltipContent={tooltipContent}
    >
      Submit
    </TooltipButton>
  );
}

function useSubmitButton(props: ActionButtonProps) {
  const {
    claim,
    chainId,
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
  const { addNotification } = useNotifications();
  const hasClaim = claim.length > 0;
  const balanceFormatted = balance?.formatted ?? "0";

  const { config } = usePrepareContractWrite({
    address: oracleAddress,
    abi: oov3Abi,
    functionName: "assertTruth",
    args: [
      stringToHex(claim),
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

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (data?.hash) {
      addNotification({
        type: "assert",
        hash: data.hash,
        chainId,
        claim,
      });
    }
  }, [data?.hash, addNotification, chainId, claim]);

  const tooltipContent = getTooltipContent();
  const disabled = !hasClaim || insufficientFunds || isLoading;

  function getTooltipContent() {
    if (isLoading) {
      return "Submitting assertion...";
    }
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
