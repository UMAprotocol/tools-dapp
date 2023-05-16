import Uma from "@/icons/uma.svg";
import Link from "next/link";
import { Links } from "./Links";
import styles from "./SideBar.module.css";

export function SideBar() {
  return (
    <nav className={styles.nav}>
      <div>
        <Link href="/" className={styles.homeLink}>
          <Uma />
          TOOLS
        </Link>
        <Links />
      </div>
    </nav>
  );
}
