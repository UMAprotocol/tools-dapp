import Assertion from "@/icons/assertion.svg";
import Dashboard from "@/icons/dashboard.svg";
import Uma from "@/icons/uma.svg";
import Link from "next/link";

export function SideBar() {
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
    <nav>
      <Link href="/">
        <Uma />
        <span>TOOLS</span>
      </Link>
      <ul>
        {links.map(({ href, label, Icon }) => (
          <li key={href}>
            <Icon />
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
