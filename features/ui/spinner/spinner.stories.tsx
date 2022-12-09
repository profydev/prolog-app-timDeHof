import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Spinner, SpinnerSize, SpinnerColor } from "./spinner";

export default {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = ({ size, color }) => (
  <div style={{ padding: 50 }}>
    <Spinner color={color} size={size} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: SpinnerSize.lg,
  color: SpinnerColor.primary,
};
Default.parameters = {
  viewMode: "docs",
};
