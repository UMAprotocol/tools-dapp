import { useNotifications } from "@/components";
import { useEffect } from "react";
import {
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import type { ActionButtonProps } from "./ActionButton";
import { TooltipButton } from "./TooltipButton";

export function ApproveButton(props: ActionButtonProps) {
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

function useApproveButton(props: ActionButtonProps) {
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

  const tooltipContent = isLoading ? "Approving..." : undefined;

  return {
    ...props,
    tooltipContent,
    disabled: isLoading,
    approve: () => write?.(),
  };
}
