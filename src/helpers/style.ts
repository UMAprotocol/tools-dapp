import type { CSSProperties } from "react";

export function cssVariables(values: Record<`--${string}`, string>) {
  return values as CSSProperties;
}

export function makeTransparentColor(color: string, opacity: number) {
  const percentageToMixWithTransparent = 100 - opacity * 100;
  return `color-mix(in srgb, ${color}, transparent ${percentageToMixWithTransparent}%)`;
}
