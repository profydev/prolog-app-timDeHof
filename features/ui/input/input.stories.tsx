import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputProps, Input, InputStates } from "./input";

export default {
  component: Input,
  title: "UI/Input",
  parameters: {
    componentSubtitle: `The Input component is used as a dynamic form element.
      We only show examples for a text input on this page for now.`,
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <div>
    <Input {...args} />
  </div>
);
export const Empty = Template.bind({});
Empty.args = {
  name: "email",
  label: "Email",
  hintText: "This is a hint text to help users",
  type: "text",
  iconSrc: "./icons/email.svg",
  state: InputStates.Empty,
};

export const filled = Template.bind({});
filled.args = {
  name: "email",
  label: "Email",
  hintText: "This is a hint text to help users",
  type: "text",
  iconSrc: "./icons/email.svg",
  value: "johndoe@gmail.com",
  state: InputStates.Filled,
};

export const Focused = Template.bind({});
Focused.args = {
  name: "email",
  label: "Email",
  hintText: "This is a hint text to help users",
  type: "text",
  iconSrc: "./icons/email.svg",
  value: "johndoe@gmail.com",
  state: InputStates.Focused,
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "email",
  label: "Email",
  hintText: "This is a hint text to help users",
  type: "text",
  iconSrc: "./icons/email.svg",
  state: InputStates.Disabled,
};

export const Error = Template.bind({});
Error.args = {
  name: "email",
  label: "Email",
  hintText: "This is a hint text to help users",
  type: "text",
  setError: true,
  value: "johndoe@gmail.com",
  state: InputStates.Focused,
};
