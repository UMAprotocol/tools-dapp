import * as RadixTooltip from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";
interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export function Tooltip({ children, content, open, onOpenChange }: Props) {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root open={open} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild className={styles.trigger}>
          {children}
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
