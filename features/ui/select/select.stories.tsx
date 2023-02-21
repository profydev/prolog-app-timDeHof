import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, SelectProps } from "./select";
import { action } from "@storybook/addon-actions";

export default {
  component: Select,
  title: "UI/Select",
  parameters: {
    componentSubtitle: `The Select component is used as a dynamic form element.
       It displays a number of options that are exposed to the user when they click on the component.
       At this moment we don’t use multi-select elements.`,
    actions: {
      handles: ["click", ".radio"],
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: SelectProps) => (
  <div>
    <Select {...args} onChange={action("onChange")} />
  </div>
);

const options = [
  "Olivia Rhye",
  "Phoenix Baker",
  "Lana Steiner",
  "Demi Wilkinson",
  "Candice Wu",
  "Natali Craig",
  "Drew Cano",
];

export const Empty = Template.bind({});
Empty.args = {
  options: options,
  label: "Team member",
  placeholder: "Select Team Member",
  hintText: "This is a hint text to help user.",
};

export const Filled = Template.bind({});
Filled.args = {
  options: options,
  label: "Team member",
  value: "Olivia Rhye",
  placeholder: "Select Team Member",
  hintText: "This is a hint text to help user.",
};

export const Focused = Template.bind({});
Focused.args = {
  options: options,
  label: "Team member",
  placeholder: "Select Team Member",
  hintText: "This is a hint text to help user.",
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: options,
  label: "Team member",
  placeholder: "Select Team Member",
  hintText: "This is a hint text to help user.",
};

export const Opened = Template.bind({});
Opened.args = {
  options: options,
  label: "Team member",
  placeholder: "Select Team Member",
  hintText: "This is a hint text to help user.",
};
