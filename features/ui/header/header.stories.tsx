import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Header } from "./header";
import { Routes } from "@config/routes";

export default {
  title: "UI/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
Default.parameters = {
  route: Routes.issues,
};
