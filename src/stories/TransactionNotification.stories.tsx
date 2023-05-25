import { Button, TransactionNotification } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta = {
  component: TransactionNotification,
};

export default meta;

type Story = StoryObj<typeof TransactionNotification>;

const Template: Story = {
  render: function Wrapper(args) {
    const [_status, setStatus] = useState(args.status ?? "idle");
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <TransactionNotification {...args} status={_status}>
          <Button
            style={{
              marginTop: "16px",
              marginLeft: "auto",
              marginRight: "16px",
            }}
          >
            show notification
          </Button>
        </TransactionNotification>
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    status: "loading",
  },
};
