import { GradientCard } from "@/components/GradientCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: GradientCard,
};

export default meta;

type Story = StoryObj<typeof GradientCard>;

const Template: Story = {
  // parameters: makeMathRandomMock(0.4),
};

export const Default: Story = {
  ...Template,
};

// function makeMathRandomMock(number: number) {
//   return {
//     moduleMock: {
//       mock: () => {
//         const mock = createMock(Math, "random");
//         mock
//           .mockReturnValueOnce(number)
//           .mockReturnValueOnce(0.3)
//           .mockReturnValueOnce(0.2);
//         return [mock];
//       },
//     },
//   };
// }
