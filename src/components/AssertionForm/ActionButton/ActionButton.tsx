import { useBalanceAndAllowance } from "@/hooks";
import type { ChainId } from "@/types";
import type { Address } from "wagmi";
import styles from "./ActionButton.module.css";
import { ApproveButton } from "./ApproveButton";
import { SubmitButton } from "./SubmitButton";

export type Props = {
  userAddress: Address;
  oracleAddress: Address;
  chainId: ChainId;
  claim: string;
  bondBigInt: bigint;
  challengePeriodBigInt: bigint;
  currencyAddress: Address;
  decimals: number;
};

export function ActionButton(props: Props) {
  const { hasApproved, insufficientFunds } = useActionButton(props);

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

function InsufficientFunds(props: Props) {
  const { balance, bondFormatted } = props;
}

function useActionButton(props: Props) {
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

  return {
    ...props,
    balance,
    allowance,
    hasApproved,
    insufficientFunds,
  };
}
