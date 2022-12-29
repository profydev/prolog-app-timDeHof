import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import {
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxSize,
} from "./checkboxGroup";

const onChange = action("onChange");
export default {
  component: CheckboxGroup,
  title: "UI/checkbox/checkboxGroup",
  parameters: {
    componentSubtitle:
      "A checkbox group is a collection of checkboxes that can be used to select multiple items from a list. The parent checkbox can also have a partly checked state when some of the group members are checked and some unchecked.",
  },
  argTypes: {
    size: {
      control: {
        type: "inline-radio",
        options: [CheckboxSize.sm, CheckboxSize.md],
      },
    },
    disabled: { control: "boolean" },
    selectedValues: { control: "array" },
    onChange: { action: "clicked" },
  },
} as ComponentMeta<typeof CheckboxGroup>;

const Template: ComponentStory<typeof CheckboxGroup> = (
  args: CheckboxGroupProps
) => <CheckboxGroup {...args} onChange={onChange} />;

export const Default = Template.bind({});
Default.args = {
  size: CheckboxSize.md,
  disabled: false,
  selectedValues: [],
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  onChange: onChange,
};

export const PartlyChecked = Template.bind({});
PartlyChecked.args = {
  size: CheckboxSize.md,
  disabled: false,
  selectedValues: ["value1", "value3"],
  options: [
    {
      label: "Parent Checkbox",
      value: "parent",
      children: [
        { label: "Option 1", value: "value1" },
        { label: "Option 2", value: "value2" },
        { label: "Option 3", value: "value3" },
      ],
    },
  ],
  onChange: onChange,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: CheckboxSize.md,
  disabled: true,
  selectedValues: ["value1"],
  options: [
    { label: "Option 1", value: "value1" },
    { label: "Option 2", value: "value2" },
    { label: "Option 3", value: "value3" },
  ],
  onChange: onChange,
};

export const Small = Template.bind({});
Small.args = {
  size: CheckboxSize.sm,
  disabled: false,
  selectedValues: ["value1"],
  options: [
    { label: "Option 1", value: "value1" },
    { label: "Option 2", value: "value2" },
    { label: "Option 3", value: "value3" },
  ],
  onChange: onChange,
};
