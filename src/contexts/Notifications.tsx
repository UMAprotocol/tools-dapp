"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type NotificationsState = {
  hashes: `0x${string}`[];
  addHash: (hash: `0x${string}`) => void;
};

const NotificationsContext = createContext<NotificationsState>({
  hashes: [],
  addHash: () => undefined,
});

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [hashes, setHashes] = useState<`0x${string}`[]>([]);

  function addHash(hash: `0x${string}`) {
    if (hashes.includes(hash)) return;
    setHashes((prev) => [...prev, hash]);
  }

  return (
    <NotificationsContext.Provider
      value={{
        hashes,
        addHash,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
