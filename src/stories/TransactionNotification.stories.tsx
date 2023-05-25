import { TransactionNotification } from "@/components";
import { NotificationsToastProvider } from "@/components/Notifications";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import * as wagmi from "wagmi";
import { MockWalletConfig } from "./MockWalletConfig";

const meta: Meta = {
  component: TransactionNotification,
};

export default meta;

type Story = StoryObj<typeof TransactionNotification>;

const Template: Story = {
  args: {
    hash: "0xbb9c71a3302dadb93f4b4815b5eb348fbe94ed4693f6ce939152ad3b08c50ddb",
  },
  render: function Wrapper(args) {
    return (
      <MockWalletConfig>
        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <NotificationsToastProvider>
            <TransactionNotification {...args} />
          </NotificationsToastProvider>
        </div>
      </MockWalletConfig>
    );
  },
};

export const Idle: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("idle"),
};

export const Loading: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("loading"),
};

export const Success: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("success"),
};

export const Error: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("error"),
};

function makeWaitForTransactionMock(
  status: "idle" | "loading" | "success" | "error"
) {
  return {
    moduleMock: {
      mock: () => {
        const mock = createMock(wagmi, "useWaitForTransaction");
        mock.mockReturnValue({
          status,
        });
        return [mock];
      },
    },
  };
}
