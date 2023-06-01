import { Card } from "@/components";
import Assertion from "@/icons/assertion.svg";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: Card,
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  args: {
    title: "Assertion Tool",
    children: (
      <>
        <h3>What does it do?</h3>
        <ul>
          <li>Create assertions</li>
          <li>Preview what your assertions will look like</li>
          <li>See the minimum bond for a given currency</li>
        </ul>
      </>
    ),
    href: "/assertion-tool",
    icon: Assertion,
  },
};
