import { Notification } from "@/components/Notifications/Notification";
import { NotificationsToastProvider } from "@/components/Notifications/Notifications";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import * as wagmi from "wagmi";
import { MockWalletConfig } from "./MockWalletConfig";

const dummyData = {
  blockHash:
    "0x05f0a73a2ecfb8d79d5328916cc1fadf0b9b7c91e430286aa0fe0b55eb92592a",
  blockNumber: "9095908",
  contractAddress: null,
  cumulativeGasUsed: "3478970",
  effectiveGasPrice: "376540594070",
  from: "0x9a8f92a830a5cb89a3816e3d267cb7791c16b04d",
  gasUsed: "209057",
  logs: [
    {
      address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      blockHash:
        "0x05f0a73a2ecfb8d79d5328916cc1fadf0b9b7c91e430286aa0fe0b55eb92592a",
      blockNumber: "9095908",
      data: "0x000000000000000000000000000000000000000000000000000000003b9aca00",
      logIndex: "49",
      removed: false,
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000009a8f92a830a5cb89a3816e3d267cb7791c16b04d",
        "0x0000000000000000000000009923d42ef695b5dd9911d05ac944d4caca3c4eab",
      ],
      transactionHash:
        "0xa2edcf20ea5df139e2c58367718cb12dad84c93a0c00fcb8cc7c6a48d9f55161",
      transactionIndex: "29",
    },
    {
      address: "0x9923d42ef695b5dd9911d05ac944d4caca3c4eab",
      blockHash:
        "0x05f0a73a2ecfb8d79d5328916cc1fadf0b9b7c91e430286aa0fe0b55eb92592a",
      blockNumber: "9095908",
      data: "0x30783000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009a8f92a830a5cb89a3816e3d267cb7791c16b04d0000000000000000000000000000000000000000000000000000000064771878000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d6000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000000000000000000000000000000000000000001174657374696e672079657420616761696e000000000000000000000000000000",
      logIndex: "50",
      removed: false,
      topics: [
        "0xdb1513f0abeb57a364db56aa3eb52015cca5268f00fd67bc73aaf22bccab02b7",
        "0x2f26f26374f86748292afb91725b8a3a99de460f8559028a0420dee9f0513062",
        "0x0000000000000000000000009a8f92a830a5cb89a3816e3d267cb7791c16b04d",
        "0x4153534552545f54525554480000000000000000000000000000000000000000",
      ],
      transactionHash:
        "0xa2edcf20ea5df139e2c58367718cb12dad84c93a0c00fcb8cc7c6a48d9f55161",
      transactionIndex: "29",
    },
  ],
  logsBloom:
    "0x00000000000000000000000000000000000000000000010001000000000000000000000000000000000000000000000000000000000000000000020000000000000000000400000000000008000010000000000000040000000000000000000000800000000000000000000000000000000000000010000008000010040000000000000000000000000000000000002000000000000020000000000000000000000000000000000000000000000000000000000040000000000000000000000000084002000000800000000000000000000000000000000000000000002000000001000000000000000000008000002000000000000010000000000000000000",
  status: "success",
  to: "0x9923d42ef695b5dd9911d05ac944d4caca3c4eab",
  transactionHash:
    "0xa2edcf20ea5df139e2c58367718cb12dad84c93a0c00fcb8cc7c6a48d9f55161",
  transactionIndex: 29,
  type: "eip1559",
};

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
            <Notification {...args} />
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
  parameters: makeWaitForTransactionMock("success", dummyData),
};

const ErrorTemplate: Story = {
  ...Template,
  parameters: makeWaitForTransactionMock("error"),
};

const assertCommonArgs = {
  type: "assert" as const,
  claim: `### stuff

  things [https://google.com](google.com)`,
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
  status: "idle" | "loading" | "success" | "error",
  data?: unknown
) {
  return {
    moduleMock: {
      mock: () => {
        const mock = createMock(wagmi, "useWaitForTransaction");
        mock.mockReturnValue({
          status,
          data,
        } as ReturnType<typeof wagmi.useWaitForTransaction>);
        return [mock];
      },
    },
  };
}
