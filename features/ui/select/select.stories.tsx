import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, SelectProps } from "./select";
import { action } from "@storybook/addon-actions";

export default {
  component: Select,
  title: "UI/Select",
  parameters: {
    componentSubtitle:
      "The Select component is used as a dynamic form element. It displays a number of options that are exposed to the user when they click on the component. At this moment we don’t use multi-select elements.",
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: SelectProps) => (
  <Select {...args} />
);

const options = ["Option 1", "Option 2", "Option 3"];

export const Default = Template.bind({});
Default.args = {
  options: options,
  onChange: action("onChange"),
  label: "Select",
  value: options[0],
  isFocused: false,
  isDisabled: false,
  isOpen: true,
};
