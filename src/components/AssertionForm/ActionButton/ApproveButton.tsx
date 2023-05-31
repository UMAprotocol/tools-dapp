import { TooltipButton, useNotifications } from "@/components";
import { useEffect } from "react";
import {
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import type { ActionButtonDelegatedProps } from "./ActionButton";

export function ApproveButton(props: ActionButtonDelegatedProps) {
  const { approve, disabled, tooltipContent } = useApproveButton(props);
  return (
    <TooltipButton
      disabled={disabled}
      onClick={approve}
      tooltipContent={tooltipContent}
    >
      Approve
    </TooltipButton>
  );
}

function useApproveButton(props: ActionButtonDelegatedProps) {
  const {
    currencyAddress,
    currencySymbol,
    bondFormatted,
    chainId,
    oracleAddress,
    bondBigInt,
  } = props;
  const { addNotification } = useNotifications();

  const { config } = usePrepareContractWrite({
    address: currencyAddress,
    abi: erc20ABI,
    functionName: "approve",
    chainId,
    args: [oracleAddress, bondBigInt],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (data?.hash) {
      addNotification({
        type: "approve",
        hash: data.hash,
        chainId,
        formattedAmount: bondFormatted,
        currencySymbol,
      });
    }
  }, [data?.hash, addNotification, chainId, bondFormatted, currencySymbol]);

  const tooltipContent = isLoading
    ? "Approving..."
    : "You must approve spending the bond amount before submitting your assertion.";

  return {
    ...props,
    tooltipContent,
    disabled: isLoading,
    approve: () => write?.(),
  };
}
