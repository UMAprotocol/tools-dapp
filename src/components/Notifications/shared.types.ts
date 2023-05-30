import type { ChainId } from "@/types";

export type BaseNotification = {
  type: "approve" | "assert";
  hash: `0x${string}`;
  chainId: ChainId;
};

export type ApproveNotification = BaseNotification & {
  type: "approve";
  formattedAmount: string;
  currencySymbol: string;
};

export type AssertNotification = BaseNotification & {
  type: "assert";
  claim: string;
};

export type TransactionNotification = AssertNotification | ApproveNotification;

export type NotificationStatus = "loading" | "success" | "error" | "idle";
