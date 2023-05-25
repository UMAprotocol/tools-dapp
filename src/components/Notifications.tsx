"use client";
import * as Toast from "@radix-ui/react-toast";
import { useNotifications } from "@/contexts";
import { TransactionNotification } from "./TransactionNotification";
import styles from "./Notifications.module.css";

export function Notifications() {
  const { hashes } = useNotifications();

  return (
    <Toast.Provider>
      {hashes.map((hash) => (
        <TransactionNotification key={hash} hash={hash} />
      ))}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
}
