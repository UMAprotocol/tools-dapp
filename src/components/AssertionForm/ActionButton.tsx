import { oov3Abi } from "@/abis";
import { Button, Tooltip } from "@/components";
import { useBalanceAndAllowance } from "@/hooks";
import type { ChainId } from "@/types";
import { stringToHex, zeroAddress } from "viem";
import type { Address } from "wagmi";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";
import styles from "./ActionButton.module.css";

interface Props {
  userAddress: Address;
  oracleAddress: Address;
  chainId: ChainId;
  claim: string;
  bond: bigint;
  currencyAddress: Address;
  decimals: number;
}
export function ActionButton(props: Props) {
  const { userAddress, chainId, bond, currencyAddress, oracleAddress } = props;
  const { balance, allowance } = useBalanceAndAllowance({
    userAddress,
    currencyAddress,
    oracleAddress,
    chainId,
  });

  const hasApproved = !!allowance && allowance >= bond;
  const insufficientFunds = !!balance && balance.value <= bond;

  return (
    <div className={styles.submitButtonWrapper}>
      {insufficientFunds ? (
        <p>too poor sorry</p>
      ) : hasApproved ? (
        <SubmitButton {...props} />
      ) : (
        <ApproveButton {...props} />
      )}
    </div>
  );
}

function SubmitButton({
  claim,
  userAddress,
  currencyAddress,
  oracleAddress,
  bond,
}: Props) {
  const hasClaim = claim.length > 0;

  const { config } = usePrepareContractWrite({
    address: oracleAddress,
    abi: oov3Abi,
    functionName: "assertTruth",
    args: [
      stringToHex(claim || "stuff", { size: 32 }),
      userAddress,
      zeroAddress,
      zeroAddress,
      720000n,
      currencyAddress,
      bond,
      stringToHex("ASSERT_TRUTH", { size: 32 }),
      stringToHex("0x0", { size: 32 }),
    ],
  });

  const { write } = useContractWrite(config);

  const submitButton = (
    <Button disabled={!hasClaim} type="submit" onClick={write}>
      Submit
    </Button>
  );

  return (
    <>
      {hasClaim ? (
        submitButton
      ) : (
        <Tooltip content="Please enter a claim to submit">
          <span>{submitButton}</span>
        </Tooltip>
      )}
    </>
  );
}

function ApproveButton({
  currencyAddress,
  chainId,
  oracleAddress,
  bond,
}: Props) {
  const { config } = usePrepareContractWrite({
    address: currencyAddress,
    abi: erc20ABI,
    functionName: "approve",
    chainId,
    args: [oracleAddress, bond],
  });

  const { write } = useContractWrite(config);

  return <Button onClick={write}>Approve</Button>;
}
