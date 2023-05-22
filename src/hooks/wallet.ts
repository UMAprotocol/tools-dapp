"use client";

import { walletsAndConnectors } from "@/constants";
import type { ChainId } from "@/types";
import { useEffect, useState } from "react";
import type { Address } from "wagmi";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";

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

export function useBalanceAndAllowance({
  userAddress,
  currencyAddress,
  oracleAddress,
  chainId,
}: {
  userAddress: Address;
  currencyAddress: Address;
  oracleAddress: Address;
  chainId: ChainId;
}) {
  const { data: balance } = useBalance({
    address: userAddress,
    token: currencyAddress,
    chainId,
  });
  const { data: allowance } = useContractRead({
    address: currencyAddress,
    abi: erc20ABI,
    functionName: "allowance",
    chainId,
    // typecast is safe because hook is only enabled when these
    // values are defined (see below)
    args: [userAddress, oracleAddress],
  });

  return {
    balance,
    allowance,
  };
}
