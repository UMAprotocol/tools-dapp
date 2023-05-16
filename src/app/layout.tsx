import { Header, WalletConfig } from "@/components";
import { SideBar } from "@/components/SideBar/SideBar";
import { halyard } from "@/constants";
import "@rainbow-me/rainbowkit/styles.css";
import "./style/animation.css";
import "./style/colors.css";
import "./style/fonts.css";
import "./style/containers.css";
import "./style/globals.css";

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
            <Header />
            <SideBar />
            <p>test</p>
            {children}
          </>
        </WalletConfig>
      </body>
    </html>
  );
}
