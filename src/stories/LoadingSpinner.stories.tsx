import { LoadingSpinner } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: LoadingSpinner,
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {};

export const BlackVariant: Story = {
  args: {
    variant: "black",
  },
};

export const UglyCustomColors: Story = {
  args: {
    color: "pink",
    secondaryColor: "green",
  },
};

export const CustomSize: Story = {
  args: {
    height: "9vh",
    width: "8%",
  },
};
