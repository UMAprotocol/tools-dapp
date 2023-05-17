import { Banner } from "@/components";
import type { Meta } from "@storybook/react";

const meta: Meta = {
  component: Banner,
};

export default meta;

export const Default = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Banner
        page="dashboard"
        title="Banner title"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus explicabo nobis qui quidem distinctio, facilis dolore praesentium iure, minima ex maiores assumenda, delectus dicta."
      />
    </div>
  ),
};
