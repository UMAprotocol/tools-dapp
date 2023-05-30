import { useBalanceAndAllowance } from "@/hooks";
import type { ChainId } from "@/types";
import type { Address } from "wagmi";
import styles from "./ActionButton.module.css";
import { ApproveButton } from "./ApproveButton";
import { AssertButton } from "./AssertButton";

export type ActionButtonDelegatedProps = {
  userAddress: Address;
  oracleAddress: Address;
  chainId: ChainId;
  claim: string;
  bondBigInt: bigint;
  bondFormatted: string;
  challengePeriodBigInt: bigint;
  currencyAddress: Address;
  currencySymbol: string;
  decimals: number;
};

export function ActionButton(delegatedProps: ActionButtonDelegatedProps) {
  const props = useActionButton(delegatedProps);
  const { hasApproved } = props;

  return (
    <div className={styles.actionButtonWrapper}>
      {hasApproved ? <AssertButton {...props} /> : <ApproveButton {...props} />}
    </div>
  );
}

export type ActionButtonProps = ReturnType<typeof useActionButton>;

function useActionButton(props: ActionButtonDelegatedProps) {
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
