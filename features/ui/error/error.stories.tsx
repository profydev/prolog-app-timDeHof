import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Error } from "./error";
import { Routes } from "@config/routes";

export default {
  title: "UI/Footer",
  component: Error,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Error>;

const Template: ComponentStory<typeof Error> = () => <Error />;

export const Default = Template.bind({});
Default.parameters = {
  route: Routes.issues,
};
