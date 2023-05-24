"use client";

import { Tooltip } from "@/components";
import Info from "@/icons/info.svg";
import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./InfoIcon.module.css";
interface Props {
  children: ReactNode;
}
export function InfoIcon({ children }: Props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Tooltip
      content={children}
      open={tooltipOpen}
      onOpenChange={setTooltipOpen}
    >
      <button onClick={() => setTooltipOpen(true)} className={styles.button}>
        <Info />
      </button>
    </Tooltip>
  );
}
