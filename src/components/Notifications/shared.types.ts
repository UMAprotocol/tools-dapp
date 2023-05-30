import type { ChainId } from "@/types";
import type { Hash } from "viem";

export type BaseNotification = {
  type: "approve" | "assert";
  hash: Hash;
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
