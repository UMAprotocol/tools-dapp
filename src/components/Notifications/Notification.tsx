"use client";

import linkStyles from "@/components/RedLink.module.css";
import { makeBlockExplorerLink } from "@/helpers";
import * as Toast from "@radix-ui/react-toast";
import ReactMarkdown from "react-markdown";
import { useWaitForTransaction } from "wagmi";
import { RedLink } from "../RedLink";
import styles from "./Notification.module.css";
import type {
  ApproveNotification as ApproveProps,
  AssertNotification as AssertProps,
  NotificationStatus,
} from "./shared.types";

export function Notification(props: ApproveProps): JSX.Element;
export function Notification(props: AssertProps): JSX.Element;
export function Notification(props: ApproveProps | AssertProps) {
  const { hash, chainId } = props;
  const { status } = useWaitForTransaction({ hash });
  const explorerLink = makeBlockExplorerLink(hash, chainId, "tx");

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
      <Toast.Action altText="view on explorer" className={styles.action}>
        <RedLink href={explorerLink}>View on explorer</RedLink>
      </Toast.Action>
    </Toast.Root>
  );
}

function ApproveNotification({
  formattedAmount,
  currencySymbol,
  status,
}: ApproveProps & { status: NotificationStatus }) {
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
}: AssertProps & { status: NotificationStatus }) {
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
      <Toast.Description className={styles.assertDescription}>
        <ReactMarkdown
          components={{
            a: (props) => (
              <a {...props} target="_blank" className={linkStyles.link} />
            ),
          }}
        >
          {claim}
        </ReactMarkdown>
      </Toast.Description>
    </>
  );
}
