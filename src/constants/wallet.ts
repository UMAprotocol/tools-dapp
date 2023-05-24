"use client";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";

import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";

export const chains = [mainnet, goerli, optimism, polygon, arbitrum];

export const walletsAndConnectors = getDefaultWallets({
  appName: "Optimistic Oracle dApp V2",
  chains,
});

export const zeroAddress = "0x0000000000000000000000000000000000000000";
