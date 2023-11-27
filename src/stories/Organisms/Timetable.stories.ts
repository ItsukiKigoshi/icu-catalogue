import type { Meta, StoryObj } from "@storybook/react";

import { Timetable } from "../../components/Timetable/Timetable";

const meta = {
  title: "Organisms/Timetable",
  component: Timetable,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Timetable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
