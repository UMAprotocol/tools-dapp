import { Header } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import { MockWalletConfig } from "./MockWalletConfig";

const meta: Meta = {
  component: Header,
};

export default meta;

type Story = StoryObj<{
  isConnected?: boolean;
  simulateWrongChain?: boolean;
}>;

const Template: Story = {
  render: function Wrapper(args) {
    return (
      <MockWalletConfig {...args}>
        <Header />
      </MockWalletConfig>
    );
  },
};

export const Connected: Story = {
  ...Template,
};

export const NotConnected: Story = {
  ...Template,
  args: {
    isConnected: false,
  },
};

export const WrongChain: Story = {
  ...Template,
  args: {
    simulateWrongChain: true,
  },
};
