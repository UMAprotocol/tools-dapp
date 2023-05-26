"use client";

import * as Toast from "@radix-ui/react-toast";
import type { ReactNode } from "react";
import { Notification } from "./Notification";
import styles from "./Notifications.module.css";
import { useNotifications } from "./NotificationsContext";

export function Notifications() {
  const { notifications } = useNotifications();

  return (
    <NotificationsToastProvider>
      {notifications.map((notification) => {
        const { hash, chainId } = notification;

        if (notification.type === "assert") {
          const { claim } = notification;
          return (
            <Notification
              type="assert"
              key={hash}
              claim={claim}
              hash={hash}
              chainId={chainId}
            />
          );
        }
        const { formattedAmount, currencySymbol } = notification;
        return (
          <Notification
            type="approve"
            key={hash}
            formattedAmount={formattedAmount}
            currencySymbol={currencySymbol}
            hash={hash}
            chainId={chainId}
          />
        );
      })}
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
