import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  CustomButton,
  ButtonSize,
  ButtonColor,
  ButtonIcon,
} from "./customButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "UI/Button",
  component: CustomButton,
  argTypes: {
    disabled: {
      name: "disabled",
      description: "disable the button",
      defaultValue: false,
      control: {
        type: "boolean",
      },
    },
    size: {
      name: "size",
      description: "Size of the button",
      defaultValue: "md",
      control: {
        type: "inline-radio",
        options: ["sm", "md", "lg", "xl"],
      },
    },
    color: {
      name: "color",
      description: "Color of the button",
      defaultValue: "primary",
      control: {
        type: "inline-radio",
        options: [
          "primary",
          "secondary",
          "gray",
          "empty",
          "empty-gray",
          "error",
        ],
      },
    },
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    actions: {
      handles: ["click.btn"],
    },
    componentSubtitle:
      "The Button is a clickable component that triggers an action. Links can also be displayed as a button.",
  },
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args) => (
  <div style={{ display: "flex", gap: 16, padding: 32 }}>
    <CustomButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  text: "Button CTA",
  disabled: false,
  onClick: action("clicked"),
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  color: ButtonColor.primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  color: ButtonColor.secondary,
};

export const Gray = Template.bind({});
Gray.args = {
  ...Default.args,
  color: ButtonColor.gray,
};

export const Empty = Template.bind({});
Empty.args = {
  ...Default.args,
  color: ButtonColor.empty,
};

export const Empty_Gray = Template.bind({});
Empty_Gray.args = {
  ...Default.args,
  color: ButtonColor.emptyGray,
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  color: ButtonColor.error,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  iconSrc: "/icons/close.svg",
  disabled: false,
  size: ButtonSize.md,
  color: ButtonColor.primary,
  iconlocation: ButtonIcon.only,
};

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  iconSrc: "/icons/close.svg",
  text: "Button CTA",
  disabled: false,
  size: ButtonSize.md,
  color: ButtonColor.primary,
  iconlocation: ButtonIcon.leading,
};

export const TrailingIcon = Template.bind({});
TrailingIcon.args = {
  iconSrc: "/icons/close.svg",
  text: "Button CTA",
  disabled: false,
  size: ButtonSize.md,
  color: ButtonColor.primary,
  iconlocation: ButtonIcon.trailing,
};
