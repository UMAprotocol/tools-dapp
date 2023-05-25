"use client";
import { useNotifications } from "@/contexts";
import * as Toast from "@radix-ui/react-toast";
import type { ReactNode } from "react";
import styles from "./Notifications.module.css";
import { TransactionNotification } from "./TransactionNotification";

export function Notifications() {
  const { hashes } = useNotifications();

  return (
    <NotificationsToastProvider>
      {hashes.map((hash) => (
        <TransactionNotification key={hash} hash={hash} />
      ))}
    </NotificationsToastProvider>
  );
}

export function NotificationsToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Toast.Provider>
      {children}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
}
