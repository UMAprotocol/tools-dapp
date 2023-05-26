"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
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

  const addNotification = useCallback(
    (notification: TransactionNotification) => {
      if (notifications.some((n) => n.hash === notification.hash)) return;
      setNotifications((notifications) => [...notifications, notification]);
    },
    [notifications]
  );

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
    }),
    [notifications, addNotification]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
