import { AssertionForm } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: AssertionForm,
};

export default meta;

type Story = StoryObj<typeof AssertionForm>;

const Template: Story = {};

export const Default = {
  ...Template,
};
