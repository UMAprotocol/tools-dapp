"use client";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";

import {
  arbitrum,
  avalanche,
  evmos,
  gnosis,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from "wagmi/chains";

export const chains = [
  mainnet,
  goerli,
  optimism,
  gnosis,
  polygon,
  evmos,
  arbitrum,
  avalanche,
  polygonMumbai,
];

export const walletsAndConnectors = getDefaultWallets({
  appName: "Optimistic Oracle dApp V2",
  chains,
});
