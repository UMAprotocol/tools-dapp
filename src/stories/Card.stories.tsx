import { Card } from "@/components";
import Assertion from "@/icons/assertion-tool.svg";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: Card,
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  args: {
    title: "Assertion Tool",
    whatItDoes: [
      "Create assertions",
      "Preview what your assertions will look like",
      "See the minimum bond for a given currency",
    ],
    href: "/assertion-tool",
    icon: Assertion,
  },
};
