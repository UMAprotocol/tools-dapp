import { AssertionForm } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import { MockWalletConfig } from "./MockWalletConfig";

const meta: Meta = {
  component: AssertionForm,
};

export default meta;

type Story = StoryObj<typeof AssertionForm>;

const Template: Story = {
  render: function Wrapper() {
    return (
      <MockWalletConfig>
        <AssertionForm />
      </MockWalletConfig>
    );
  },
};

export const Default = {
  ...Template,
};
