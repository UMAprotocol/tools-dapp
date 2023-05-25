import { Button } from "@/components";
import { useNotifications } from "@/contexts";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";
import type { ActionButtonProps } from "./ActionButton";

export function ApproveButton(props: ActionButtonProps) {
  const { approve } = useApproveButton(props);
  return <Button onClick={approve}>Approve</Button>;
}

function useApproveButton(props: ActionButtonProps) {
  const { currencyAddress, chainId, oracleAddress, bondBigInt } = props;
  const { addHash } = useNotifications();

  const { config } = usePrepareContractWrite({
    address: currencyAddress,
    abi: erc20ABI,
    functionName: "approve",
    chainId,
    args: [oracleAddress, bondBigInt],
  });

  const { data, write } = useContractWrite(config);

  if (data?.hash) {
    addHash(data.hash);
  }

  return {
    ...props,
    approve: () => write?.(),
  };
}
