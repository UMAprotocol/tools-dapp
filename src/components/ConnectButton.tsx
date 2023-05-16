"use client";

import { useWalletIcon } from "@/hooks";
import Chevron from "@/icons/chevron.svg";
import Warning from "@/icons/warning.svg";
import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Image from "next/image";
import type { CSSProperties } from "react";
import style from "./ConnectButton.module.css";

export function ConnectButton() {
  const walletIcon = useWalletIcon();

  return (
    <RainbowkitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && !!account && !!chain;

        const wrapperStyle = {
          "--pointer-events": mounted ? "" : "none",
          "--user-select": mounted ? "" : "none",
        } as CSSProperties;

        return (
          <div className={style.wrapper} style={wrapperStyle}>
            {(() => {
              if (!connected) {
                return (
                  <button className={style.button} onClick={openConnectModal}>
                    Connect wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className={style.button} onClick={openChainModal}>
                    <Warning className={style.warningIcon} />
                    Wrong network
                  </button>
                );
              }

              return (
                <button
                  className={style.button}
                  onClick={openAccountModal}
                  style={
                    {
                      "--justify-content": "space-between",
                      "--background": "var(--blue-grey-600)",
                    } as CSSProperties
                  }
                >
                  <div className={style.buttonInnerWrapper}>
                    {walletIcon && (
                      <Image
                        className={style.walletIcon}
                        unoptimized
                        src={walletIcon}
                        width={25}
                        height={25}
                        alt="Connected wallet icon"
                      />
                    )}
                    {account.displayName}
                  </div>
                  <Chevron />
                </button>
              );
            })()}
          </div>
        );
      }}
    </RainbowkitConnectButton.Custom>
  );
}
