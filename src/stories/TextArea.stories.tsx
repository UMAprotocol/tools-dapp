import { TextArea } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

const Template: Story = {};

export const Default = {
  ...Template,
};

export const Disabled = {
  ...Template,
  args: {
    disabled: true,
  },
};
