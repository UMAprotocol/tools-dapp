import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type Props = ComponentProps<"button">;
export function Button({ children, ...delegated }: Props) {
  return (
    <button className={styles.button} {...delegated}>
      {children}
    </button>
  );
}
