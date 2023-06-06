import { GradientCard } from "@/components/GradientCard";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";

const meta: Meta = {
  component: GradientCard,
};

export default meta;

type Story = StoryObj<typeof GradientCard>;

const Template: Story = {
  parameters: makeMathRandomMock(42),
};

export const Default: Story = {
  ...Template,
};

function makeMathRandomMock(number: number) {
  return {
    moduleMock: {
      mock: () => {
        const mock = createMock(Math, "random");
        mock.mockReturnValue(number);
        return [mock];
      },
    },
  };
}
