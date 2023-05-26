import { Notification } from "@/components/Notifications/Notification";
import { NotificationsToastProvider } from "@/components/Notifications/Notifications";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import * as wagmi from "wagmi";
import { MockWalletConfig } from "./MockWalletConfig";

const meta: Meta = {
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

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
            <Notification {...args} />
          </NotificationsToastProvider>
        </div>
      </MockWalletConfig>
    );
  },
};

const IdleTemplate: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("idle"),
};

const LoadingTemplate: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("loading"),
};

const SuccessTemplate: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("success"),
};

const ErrorTemplate: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("error"),
};

const assertCommonArgs = {
  type: "assert" as const,
  claim: `### stuff

  things
  
  [https://google.com](google.com)`,
};

const approveCommonArgs = {
  type: "approve" as const,
  formattedAmount: "1.2345",
  currencySymbol: "ETH",
};

// renders nothing when idle
export const AssertIdle: Story = {
  ...IdleTemplate,
  parameters: {
    ...IdleTemplate.parameters,
  },
  args: {
    ...assertCommonArgs,
  },
};

export const AssertLoading: Story = {
  ...LoadingTemplate,
  parameters: {
    ...LoadingTemplate.parameters,
  },
  args: {
    ...assertCommonArgs,
  },
};

export const AssertSuccess: Story = {
  ...SuccessTemplate,
  parameters: {
    ...SuccessTemplate.parameters,
  },
  args: {
    ...assertCommonArgs,
  },
};

export const AssertError: Story = {
  ...ErrorTemplate,
  parameters: {
    ...ErrorTemplate.parameters,
  },
  args: {
    ...assertCommonArgs,
  },
};

// renders nothing when idle
export const ApproveIdle: Story = {
  ...IdleTemplate,
  parameters: {
    ...IdleTemplate.parameters,
  },
  // @ts-expect-error storybook doesn't understand function overloads
  args: {
    ...approveCommonArgs,
  },
};

export const ApproveLoading: Story = {
  ...LoadingTemplate,
  parameters: {
    ...LoadingTemplate.parameters,
  },
  // @ts-expect-error storybook doesn't understand function overloads
  args: {
    ...approveCommonArgs,
  },
};

export const ApproveSuccess: Story = {
  ...SuccessTemplate,
  parameters: {
    ...SuccessTemplate.parameters,
  },
  // @ts-expect-error storybook doesn't understand function overloads
  args: {
    ...approveCommonArgs,
  },
};

export const ApproveError: Story = {
  ...ErrorTemplate,
  parameters: {
    ...ErrorTemplate.parameters,
  },
  // @ts-expect-error storybook doesn't understand function overloads
  args: {
    ...approveCommonArgs,
  },
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
        } as ReturnType<typeof wagmi.useWaitForTransaction>);
        return [mock];
      },
    },
  };
}
