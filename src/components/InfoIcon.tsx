"use client";

import { Tooltip } from "@/components";
import Info from "@/icons/info.svg";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import styles from "./InfoIcon.module.css";
interface Props {
  children: ReactNode;
  style?: CSSProperties;
}
export function InfoIcon({ children, style }: Props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Tooltip
      content={children}
      open={tooltipOpen}
      onOpenChange={setTooltipOpen}
    >
      <button onClick={() => setTooltipOpen(true)} className={styles.button}>
        <Info style={style} />
      </button>
    </Tooltip>
  );
}
