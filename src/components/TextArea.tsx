import type { ComponentProps } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = ComponentProps<"textarea">;

export function TextArea(props: TextAreaProps) {
  return <textarea {...props} className={styles.textarea} />;
}
