import type { ComponentPropsWithRef, Ref } from "react";
import { forwardRef } from "react";
import styles from "./Button.module.css";

type Props = ComponentPropsWithRef<"button">;
function Button_(
  { children, ...delegated }: Props,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button className={styles.button} {...delegated} ref={ref}>
      {children}
    </button>
  );
}

export const Button = forwardRef(Button_);
