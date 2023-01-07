import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, SelectProps, SelectionStates } from "./select";
import { action } from "@storybook/addon-actions";

export default {
  component: Select,
  title: "UI/Select",
  parameters: {
    componentSubtitle: `The Select component is used as a dynamic form element.
       It displays a number of options that are exposed to the user when they click on the component.
       At this moment we don’t use multi-select elements.`,
    actions: {
      handles: ["change", ".radio"],
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: SelectProps) => (
  <div>
    <Select {...args} />
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

export const Default = Template.bind({});
Default.args = {
  options: options,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    return action("onChange")(event.target.value);
  },
  label: "Team member",
  defaultValue: "Select Team Member",
  state: SelectionStates.Empty,
  hintText: "This is a hint text to help user.",
};
