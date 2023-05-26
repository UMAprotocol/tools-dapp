"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Oval } from "react-loader-spinner";

type OvalProps = ComponentPropsWithoutRef<typeof Oval>;

type Props = OvalProps & {
  variant?: "red" | "black";
};
export function LoadingSpinner({
  variant = "red",
  width = 40,
  height = 40,
  color,
  secondaryColor,
  ...delegated
}: Props) {
  const _color = color
    ? color
    : variant === "red"
    ? "var(--red-500)"
    : "var(--blue-grey-700)";
  const _secondaryColor = secondaryColor
    ? secondaryColor
    : variant === "red"
    ? "var(--red-500-opacity-50)"
    : "var(--blue-grey-700-opacity-50)";
  return (
    <Oval
      width={width}
      height={height}
      color={_color}
      secondaryColor={_secondaryColor}
      {...delegated}
    />
  );
}
