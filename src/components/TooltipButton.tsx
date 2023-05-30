import { Button, Tooltip } from "@/components";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tooltipContent: ReactNode | undefined;
  disabled: boolean;
  onClick: () => void | undefined;
};
export function TooltipButton({
  children,
  tooltipContent,
  disabled,
  onClick,
}: Props) {
  return (
    <Tooltip content={tooltipContent} disabled={disabled}>
      <Button disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </Tooltip>
  );
}
