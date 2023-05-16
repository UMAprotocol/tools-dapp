"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createPublicClient, createWalletClient, http } from "viem";
import { WagmiConfig, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { MockConnector } from "wagmi/connectors/mock";

function mockWagmiConfigFactory({
  isConnected = true,
  simulateWrongChain = false,
}) {
  const chainId = simulateWrongChain ? goerli.id : mainnet.id;
  const connector = new MockConnector({
    chains: [mainnet],
    options: {
      chainId,
      flags: {
        isAuthorized: isConnected,
      },
      walletClient: createWalletClient({
        account: "0x718648C8c531F91b528A7757dD2bE813c3940608",
        transport: http(process.env.INFURA_URL ?? ""),
      }),
    },
  });

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [connector],
    publicClient,
  });

  return wagmiConfig;
}

export function MockWalletConfig({
  children,
  isConnected = true,
  simulateWrongChain = false,
}: {
  isConnected?: boolean;
  simulateWrongChain?: boolean;
  children: React.ReactNode;
}) {
  const wagmiConfig = mockWagmiConfigFactory({
    isConnected,
    simulateWrongChain,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={[mainnet]}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
