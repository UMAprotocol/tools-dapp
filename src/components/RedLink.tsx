import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./RedLink.module.css";

type LinkProps = ComponentProps<typeof Link>;

type Props = LinkProps & {
  children: React.ReactNode;
};
export function RedLink({ children, ...delegated }: Props) {
  return (
    <Link {...delegated} className={styles.link}>
      {children}
    </Link>
  );
}
