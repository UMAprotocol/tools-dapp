import { uniq } from "lodash";
import type { ReactNode } from "react";
import { TooltipButton } from "./TooltipButton";

type Props = {
  children: ReactNode;
  errors: string[];
};
export function ErrorButton({ children, errors }: Props) {
  const tooltipContent = uniq(errors).map((error) => (
    <p key={error}>{error}.</p>
  ));

  return (
    <TooltipButton
      tooltipContent={tooltipContent}
      disabled={true}
      onClick={() => undefined}
    >
      {children}
    </TooltipButton>
  );
}
