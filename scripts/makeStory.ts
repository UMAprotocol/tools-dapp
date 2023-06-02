import { writeFileSync } from "fs";
import { parse } from "ts-command-line-args";

type Args = {
  component: string;
  importPath?: string;
};

const args = parse<Args>({
  component: String,
  importPath: { type: String, optional: true },
});

const { component, importPath } = args;

const componentPath = `@/components/${component}`;

const importStatement = importPath
  ? `import { ${component} } from "${importPath}";`
  : `import { ${component} } from "${componentPath}";`;

const story = `${importStatement}
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: ${component},
};

export default meta;

type Story = StoryObj<typeof ${component}>;

const Template: Story = {};

export const Default: Story = {
  ...Template,
};
`;

const writePath = `src/stories/${component}.stories.tsx`;

writeFileSync(writePath, story);
