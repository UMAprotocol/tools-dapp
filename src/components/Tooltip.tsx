"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";
type Props = {
  children: React.ReactNode;
  content: React.ReactNode | undefined;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};
export function Tooltip({
  children,
  content,
  open,
  onOpenChange,
  disabled,
}: Props) {
  if (!content) return <>{children}</>;
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root open={open} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>
          <span className={styles.trigger} aria-disabled={disabled}>
            {children}
          </span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={4}
            alignOffset={4}
            className={styles.content}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
