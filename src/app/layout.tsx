import { ConnectWallet, WalletConfig } from "@/components";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

export const metadata = {
  title: "Tools for UMA",
  description: "Making life easier for UMAns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletConfig>
          <>
            <ConnectWallet />
            {children}
          </>
        </WalletConfig>
      </body>
    </html>
  );
}
