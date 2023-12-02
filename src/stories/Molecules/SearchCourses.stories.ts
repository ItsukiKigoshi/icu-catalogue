import type { Meta, StoryObj } from "@storybook/react";

import SearchCourses from "../../components/Navbar/SearchCourses";

const meta = {
  title: "Molecules/SeachCourses",
  component: SearchCourses,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof SearchCourses>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
