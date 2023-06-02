import type { AssertionFormProps } from "../shared.types";
import styles from "./ActionButton.module.css";
import { ApproveButton } from "./ApproveButton";
import { AssertButton } from "./AssertButton";

export function ActionButton(props: AssertionFormProps) {
  const { hasApproved } = props;

  return (
    <div className={styles.actionButtonWrapper}>
      {hasApproved ? <AssertButton {...props} /> : <ApproveButton {...props} />}
    </div>
  );
}
