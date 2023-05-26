"use client";

import * as Toast from "@radix-ui/react-toast";
import { useWaitForTransaction } from "wagmi";
import styles from "./Notification.module.css";
import type { NotificationStatus } from "./shared.types";
import { ApproveNotification, AssertNotification } from "./shared.types";

export function Notification(props: ApproveNotification): JSX.Element;
export function Notification(props: AssertNotification): JSX.Element;
export function Notification(props: ApproveNotification | AssertNotification) {
  const { hash } = props;
  const { status } = useWaitForTransaction({ hash });

  if (status === "idle") return null;

  const duration = status === "loading" ? Infinity : 5000;

  return (
    <Toast.Root duration={duration} className={styles.root}>
      {props.type === "assert" && (
        <AssertNotification {...props} status={status} />
      )}
      {props.type === "approve" && (
        <ApproveNotification {...props} status={status} />
      )}
      <Toast.Action altText="view on etherscan">View on etherscan</Toast.Action>
    </Toast.Root>
  );
}

function ApproveNotification({
  formattedAmount,
  currencySymbol,
  status,
}: ApproveNotification & { status: NotificationStatus }) {
  const title = getTitle();
  function getTitle() {
    switch (status) {
      case "loading":
        return "Submitting approval...";
      case "success":
        return "Approval submitted";
      case "error":
        return "Approval failed";
    }
  }
  return (
    <>
      <Toast.Title>{title}</Toast.Title>
      <Toast.Description>
        {formattedAmount} {currencySymbol}
      </Toast.Description>
    </>
  );
}

function AssertNotification({
  claim,
  status,
}: AssertNotification & { status: NotificationStatus }) {
  const title = getTitle();
  function getTitle() {
    switch (status) {
      case "loading":
        return "Submitting assertion...";
      case "success":
        return "Assertion submitted";
      case "error":
        return "Assertion failed";
    }
  }
  return (
    <>
      <Toast.Title>{title}</Toast.Title>
      <Toast.Description>&quot;{claim}&quot;</Toast.Description>
    </>
  );
}
