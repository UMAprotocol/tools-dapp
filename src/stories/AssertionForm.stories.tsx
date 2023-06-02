import { AssertionForm } from "@/components";
import * as useAssertionForm from "@/components/AssertionForm/useAssertionForm";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import { MockWalletConfig } from "./MockWalletConfig";
import { mockAssertionFormProps } from "./mocks";

const meta: Meta = {
  component: AssertionForm,
};

export default meta;

type Story = StoryObj<typeof AssertionForm>;

function makeUseAssertionFormMock() {
  return {
    moduleMock: {
      mock: () => {
        const mock = createMock(useAssertionForm, "useAssertionForm");
        mock.mockReturnValue(mockAssertionFormProps);
      },
    },
  };
}

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
  parameters: makeUseAssertionFormMock(),
};
