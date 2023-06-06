import { GradientCard } from "@/components/GradientCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: GradientCard,
};

export default meta;

type Story = StoryObj<typeof GradientCard>;

const Template: Story = {};

export const Default: Story = {
  ...Template,
};
