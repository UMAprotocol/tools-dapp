import { SideBar } from "@/components/SideBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: SideBar,
};

export default meta;

type Story = StoryObj<typeof SideBar>;

const Template: Story = {
  render: () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <SideBar />
    </div>
  ),
};

export const Default = {
  ...Template,
};
