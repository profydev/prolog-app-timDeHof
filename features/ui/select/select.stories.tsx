import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, Option } from "./";

export default {
  component: Select,
  title: "UI/Select",
  parameters: {
    layout: "fullscreen",
    componentSubtitle: `The Select component is used as a dynamic form element.
       It displays a number of options that are exposed to the user when they click on the component.
       At this moment we don’t use multi-select elements.`,
  },
} as ComponentMeta<typeof Select>;

const selectData = [
  "Phoenix Baker",
  "Olivia Rhye",
  "Lana Steiner",
  "Demi Wilkinson",
  "Candice Wu",
  "Natali Craig",
  "Drew Cano",
];

const Template: ComponentStory<typeof Select> = (props) => (
  <div style={{ padding: 50, height: 400 }}>
    <Select {...props}>
      {selectData.map((name, index) => (
        <Option key={index} value={name}>
          {name}
        </Option>
      ))}
    </Select>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  placeholder: "Select team member",
  icon: "/icons/user.svg",
  label: "Team member",
  hintText: "This is a hint text to help user.",
  defaultValue: "Demi Wilkinson",
  error: "",
};
Default.parameters = {
  viewmode: "docs",
};
