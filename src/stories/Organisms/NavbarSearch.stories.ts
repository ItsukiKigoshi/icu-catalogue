import type { Meta, StoryObj } from "@storybook/react";

import { NavbarSearch } from "../../components/Navbar/NavbarSearch";

const meta = {
  title: "Organisms/NavbarSearch",
  component: NavbarSearch,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavbarSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
