import { oov3Abi } from "@/abis";
import { TooltipButton, useNotifications } from "@/components";
import { useEffect } from "react";
import type { Address } from "viem";
import { stringToHex, zeroAddress } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import type { AssertionFormProps } from "../useAssertionForm";

export function AssertButton(props: AssertionFormProps) {
  const { disabled, submitAssertion, tooltipContent } = useAssertButton(props);
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

function useAssertButton(props: AssertionFormProps) {
  const {
    claim,
    chainId,
    bondBigInt,
    challengePeriodBigInt,
    userAddress,
    currencyAddress,
    oracleAddress,
  } = props;
  const { addNotification } = useNotifications();
  const hasClaim = claim.length > 0;

  const { config } = usePrepareContractWrite({
    address: oracleAddress,
    abi: oov3Abi,
    functionName: "assertTruth",
    enabled: !!userAddress && !!currencyAddress,
    args: [
      stringToHex(claim),
      userAddress as Address,
      zeroAddress,
      zeroAddress,
      challengePeriodBigInt,
      currencyAddress as Address,
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
  const disabled = !hasClaim || isLoading;

  function getTooltipContent() {
    if (isLoading) {
      return "Submitting assertion...";
    }
    if (!hasClaim) {
      return "Please enter a claim to submit";
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
