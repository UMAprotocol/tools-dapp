import {
  Header,
  Notifications,
  NotificationsProvider,
  SideBar,
  WalletConfig,
} from "@/components";
import { halyard } from "@/constants";
import "@rainbow-me/rainbowkit/styles.css";
import "./style/animation.css";
import "./style/colors.css";
import "./style/containers.css";
import "./style/fonts.css";
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
          <NotificationsProvider>
            <Header />
            <SideBar />
            {children}
            <Notifications />
          </NotificationsProvider>
        </WalletConfig>
      </body>
    </html>
  );
}
