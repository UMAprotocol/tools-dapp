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
  bondBigInt: bigint;
  challengePeriodBigInt: bigint;
  currencyAddress: Address;
  decimals: number;
}
export function ActionButton(props: Props) {
  const { userAddress, chainId, bondBigInt, currencyAddress, oracleAddress } =
    props;
  const { balance, allowance } = useBalanceAndAllowance({
    userAddress,
    currencyAddress,
    oracleAddress,
    chainId,
  });

  const hasApproved = !!allowance && allowance >= bondBigInt;
  const insufficientFunds = !!balance && balance.value <= bondBigInt;

  return (
    <div className={styles.submitButtonWrapper}>
      {insufficientFunds ? (
        <p className={styles.insufficientFunds}>
          Insufficient balance for bond
        </p>
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
  bondBigInt,
  challengePeriodBigInt,
  userAddress,
  currencyAddress,
  oracleAddress,
}: Props) {
  const hasClaim = claim.length > 0;

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

  const tooltipContent = hasClaim
    ? undefined
    : "Please enter a claim to submit";

  return (
    <Tooltip content={tooltipContent}>
      <Button disabled={!hasClaim} onClick={write}>
        <span>Submit</span>
      </Button>
    </Tooltip>
  );
}

function ApproveButton({
  currencyAddress,
  chainId,
  oracleAddress,
  bondBigInt,
}: Props) {
  const { config } = usePrepareContractWrite({
    address: currencyAddress,
    abi: erc20ABI,
    functionName: "approve",
    chainId,
    args: [oracleAddress, bondBigInt],
  });

  const { write } = useContractWrite(config);

  return <Button onClick={write}>Approve</Button>;
}
