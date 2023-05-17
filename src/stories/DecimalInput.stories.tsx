import { DecimalInput } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useState } from "react";

const meta: Meta = {
  component: DecimalInput,
};

export default meta;

type Args = ComponentProps<typeof DecimalInput> & {
  error?: string;
};

type Story = StoryObj<Args>;

const Template: Story = {
  render: function Wrapper(args) {
    const [value, setValue] = useState(args.value ?? "");
    const [error, setError] = useState(args.error ?? "");

    return (
      <div>
        <DecimalInput
          {...args}
          value={value}
          onInput={setValue}
          addErrorMessage={setError}
          removeErrorMessage={() => setError("")}
        />
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    placeholder: "Enter a number",
  },
};
