import { ConnectWallet, WalletConfig } from "@/components";
import { halyard } from "@/constants";
import "@rainbow-me/rainbowkit/styles.css";
import "./fonts.css";
import "./colors.css";
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
    <html lang="en" className={halyard.variable}>
      <body>
        <WalletConfig>
          <>
            <ConnectWallet />
            <p>test</p>
            {children}
          </>
        </WalletConfig>
      </body>
    </html>
  );
}
