import { cssVariables } from "@/helpers";
import Assertion from "@/icons/assertion.svg";
import Dashboard from "@/icons/dashboard.svg";
import Uma from "@/icons/uma.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SideBar.module.css";

export function SideBar() {
  const pathname = usePathname();
  const links = [
    {
      href: "/",
      label: "Dashboard",
      Icon: Dashboard,
    },
    {
      href: "/assertion-tool",
      label: "Assertion tool",
      Icon: Assertion,
    },
  ];

  return (
    <nav className={styles.nav}>
      <div>
        <Link href="/" className={styles.homeLink}>
          <Uma />
          TOOLS
        </Link>
        <ul className={styles.linksList}>
          {links.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={styles.link}
                style={cssVariables({
                  "--background": pathname.startsWith(href)
                    ? "var(--white)"
                    : "transparent",
                })}
              >
                <Icon />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
