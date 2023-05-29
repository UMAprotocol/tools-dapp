import { LoadingSpinner } from "./LoadingSpinner";
import { TooltipButton } from "./TooltipButton";

export function LoadingButton() {
  return (
    <TooltipButton
      tooltipContent="Loading data from the chain..."
      disabled={true}
      onClick={() => undefined}
    >
      <LoadingSpinner variant="white" />
    </TooltipButton>
  );
}
