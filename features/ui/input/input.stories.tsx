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
