import { Button } from "@/components";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";
import type { Props } from "./ActionButton";

export function ApproveButton(props: Props) {
  const { approve } = useApproveButton(props);
  return <Button onClick={approve}>Approve</Button>;
}

function useApproveButton(props: Props) {
  const { currencyAddress, chainId, oracleAddress, bondBigInt } = props;

  const { config } = usePrepareContractWrite({
    address: currencyAddress,
    abi: erc20ABI,
    functionName: "approve",
    chainId,
    args: [oracleAddress, bondBigInt],
  });

  const { write } = useContractWrite(config);

  return {
    ...props,
    approve: () => write?.(),
  };
}
