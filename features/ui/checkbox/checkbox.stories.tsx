import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Checkbox,
  CheckboxState,
  CheckboxSize,
  CheckboxProps,
} from "./checkbox";

export default {
  component: Checkbox,
  title: "UI/checkbox",
  parameters: {
    componentSubtitle:
      "Checkboxes are used as form elements to select or unselect an item. Within a checkbox group the parent checkbox can also have a partly checked state when some of the group members are checked and some unchecked.",
  },
  argTypes: {
    state: {
      control: {
        type: "inline-radio",
        options: [
          CheckboxState.Checked,
          CheckboxState.Unchecked,
          CheckboxState.PartlyChecked,
        ],
      },
    },
    disabled: { control: "boolean" },
    size: {
      control: {
        type: "inline-radio",
        options: [CheckboxSize.sm, CheckboxSize.md],
      },
    },
    onChange: { action: "clicked" },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args: CheckboxProps) => (
  <Checkbox {...args} />
);

export const Unchecked = Template.bind({});
Unchecked.args = {
  state: CheckboxState.Unchecked,
  disabled: false,
  size: CheckboxSize.md,
  text: "Unchecked",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
};

export const Checked = Template.bind({});
Checked.args = {
  state: CheckboxState.Checked,
  disabled: false,
  size: CheckboxSize.md,
  text: "Checked",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
};

export const PartlyChecked = Template.bind({});
PartlyChecked.args = {
  state: CheckboxState.PartlyChecked,
  disabled: false,
  size: CheckboxSize.md,
  text: "PartlyChecked",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  state: CheckboxState.Unchecked,
  disabled: true,
  size: CheckboxSize.md,
  text: "Disabled",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
};

export const Small = Template.bind({});
Small.args = {
  state: CheckboxState.Unchecked,
  disabled: false,
  size: CheckboxSize.sm,
  text: "Small",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
};
