import { Tooltip } from "@/components";
import Info from "@/icons/info.svg";
import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./InfoIcon.module.css";
interface Props {
  content: ReactNode;
}
export function InfoIcon({ content }: Props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Tooltip content={content} open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <button onClick={() => setTooltipOpen(true)} className={styles.button}>
        <Info />
      </button>
    </Tooltip>
  );
}
