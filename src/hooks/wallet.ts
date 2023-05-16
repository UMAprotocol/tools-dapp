"use client";

import { walletsAndConnectors } from "@/constants";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

/**
 * Hook to get the icon of the currently connected wallet.
 * @returns The icon of the currently connected wallet as a data-url that can be used as the `src` of an `img` element.
 */
export function useWalletIcon() {
  const { connector } = useAccount();
  const [walletIcon, setWalletIcon] = useState("");

  const wallets = walletsAndConnectors.wallets.flatMap(
    ({ wallets }) => wallets
  );

  const iconsAndIds = wallets.map(({ id, iconBackground, iconUrl }) => ({
    id,
    iconBackground,
    iconUrl,
  }));

  useEffect(() => {
    void findIcon();

    async function findIcon() {
      const connectorId = connector?.id === "mock" ? "metaMask" : connector?.id;
      const iconUrlOrGetter = iconsAndIds.find(
        ({ id }) => id === connectorId
      )?.iconUrl;

      if (!iconUrlOrGetter) return;

      const iconUrl =
        typeof iconUrlOrGetter === "function"
          ? await iconUrlOrGetter()
          : iconUrlOrGetter;

      setWalletIcon(iconUrl);
    }
  }, [connector, iconsAndIds, walletIcon]);

  return walletIcon;
}
