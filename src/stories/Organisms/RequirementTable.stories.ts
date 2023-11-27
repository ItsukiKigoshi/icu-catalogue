import type { Meta, StoryObj } from "@storybook/react";

import RequirementTable from "../../components/RequirementTable/RequirementTable";

const meta = {
  title: "Organisms/RequirementTable",
  component: RequirementTable,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof RequirementTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
