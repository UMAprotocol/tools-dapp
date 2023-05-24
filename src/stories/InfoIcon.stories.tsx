import { InfoIcon } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: InfoIcon,
};

export default meta;

type Story = StoryObj<typeof InfoIcon>;

const Template: Story = {
  args: {
    children: "This is a tooltip",
  },
};

export const Default = {
  ...Template,
};
