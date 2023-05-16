import type { CSSProperties } from "react";

export function cssVariables(values: Record<`--${string}`, string>) {
  return values as CSSProperties;
}
