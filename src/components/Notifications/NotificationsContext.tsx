"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { TransactionNotification } from "./shared.types";

type NotificationsState = {
  notifications: TransactionNotification[];
  addNotification: (notification: TransactionNotification) => void;
};

const NotificationsContext = createContext<NotificationsState>({
  notifications: [],
  addNotification: () => undefined,
});

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<TransactionNotification[]>(
    []
  );

  function addNotification(notification: TransactionNotification) {
    setNotifications((notifications) => [...notifications, notification]);
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
