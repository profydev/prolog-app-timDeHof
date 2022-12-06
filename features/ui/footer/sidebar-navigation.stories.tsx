import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FooterBar } from "./footer";
import { Routes } from "@config/routes";

export default {
  title: "UI/Footer",
  component: FooterBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof FooterBar>;

const Template: ComponentStory<typeof FooterBar> = () => <FooterBar />;

export const Default = Template.bind({});
Default.parameters = {
  route: Routes.issues,
};
