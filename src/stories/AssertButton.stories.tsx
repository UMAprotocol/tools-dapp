import * as useAssertButton from "@/components/AssertionForm/ActionButton/AssertButton";
import { AssertButton } from "@/components/AssertionForm/ActionButton/AssertButton";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import { MockWalletConfig } from "./MockWalletConfig";

const meta: Meta = {
  component: AssertButton,
};

export default meta;

type Story = StoryObj<typeof AssertButton>;

const Template: Story = {
  render: function Wrapper(args) {
    return (
      <MockWalletConfig>
        <div
          style={{
            padding: 52,
          }}
        >
          <AssertButton {...args} />
        </div>
      </MockWalletConfig>
    );
  },
};

export const Default: Story = {
  ...Template,
  parameters: makeUseAssertButtonMock(),
};

type MockReturnValues = ReturnType<typeof useAssertButton.useAssertButton>;
function makeUseAssertButtonMock(
  args: Partial<MockReturnValues> = {
    disabled: false,
    submitAssertion: () => undefined,
    tooltipContent: undefined,
  }
) {
  return {
    moduleMock: {
      mock: () => {
        const mock = createMock(useAssertButton, "useAssertButton");
        mock.mockReturnValue(args as MockReturnValues);
        return [mock];
      },
    },
  };
}
