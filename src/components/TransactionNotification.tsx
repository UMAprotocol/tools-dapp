"use client";

import * as Toast from "@radix-ui/react-toast";
import { useWaitForTransaction } from "wagmi";
import styles from "./TransactionNotification.module.css";

type Props = {
  hash: `0x${string}`;
};

export function TransactionNotification({ hash }: Props) {
  const { status } = useWaitForTransaction({ hash });

  if (status === "idle") return null;

  const duration = status === "loading" ? Infinity : 5000;

  return (
    <Toast.Root duration={duration} className={styles.root}>
      <Toast.Title>Notification</Toast.Title>
      <Toast.Description>
        {status} | {hash}
      </Toast.Description>
      <Toast.Action altText="view on etherscan">View on etherscan</Toast.Action>
    </Toast.Root>
  );
}
