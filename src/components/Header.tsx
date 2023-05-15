import Link from "next/link";
import { ConnectButton } from "@/components";
import styles from "./Header.module.css";

export function Header() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <Link className={styles.link} href="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/assertion-tool">
            Assertion tool
          </Link>
        </li>
      </ul>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
}
