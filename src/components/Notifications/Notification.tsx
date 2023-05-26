"use client";

import linkStyles from "@/components/RedLink.module.css";
import { makeBlockExplorerLink } from "@/helpers";
import Success from "@/icons/success.svg";
import Warning from "@/icons/warning.svg";
import * as Toast from "@radix-ui/react-toast";
import ReactMarkdown from "react-markdown";
import { useWaitForTransaction } from "wagmi";
import { LoadingSpinner } from "../LoadingSpinner";
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

  const indicator = getIndicator();

  function getIndicator() {
    switch (status) {
      case "loading":
        return <LoadingSpinner variant="black" />;
      case "success":
        return <Success />;
      case "error":
        return <Warning />;
      default:
        return <LoadingSpinner />;
    }
  }

  return (
    <Toast.Root duration={duration} className={styles.root}>
      {indicator}
      <div>
        {props.type === "assert" && (
          <AssertNotification {...props} status={status} />
        )}
        {props.type === "approve" && (
          <ApproveNotification {...props} status={status} />
        )}
        <Toast.Action altText="view on explorer" className={styles.action}>
          <RedLink href={explorerLink}>View on explorer</RedLink>
        </Toast.Action>
      </div>
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
        return "Approving...";
      case "success":
        return "Approved successfully";
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
