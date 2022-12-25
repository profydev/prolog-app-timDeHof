import React from "react";
import Image from "next/image";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CustomButton, ButtonSize, ButtonColor } from "./customButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "UI/Button",
  component: CustomButton,
  argTypes: {
    isDisabled: {
      name: "isDisabled",
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
      },
    },
    color: {
      name: "color",
      description: "Color of the button",
      defaultValue: "primary",
      control: {
        type: "inline-radio",
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
  children: "Button CTA",
  isDisabled: false,
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
const childIcon = () => (
  <Image src="/icons/close.svg" width={30} height={30} alt="Close menu" />
);
IconOnly.args = {
  children: childIcon(),
  isDisabled: false,
  size: ButtonSize.md,
  color: ButtonColor.primary,
};

export const LeadingIcon = Template.bind({});
const childLeadingIcon = () => (
  <>
    <Image src="/icons/close.svg" width={30} height={30} alt="Close menu" />
    Close menu
  </>
);
LeadingIcon.args = {
  children: childLeadingIcon(),
  isDisabled: false,
  size: ButtonSize.md,
  color: ButtonColor.primary,
};

export const TrailingIcon = Template.bind({});
const childTrailingIcon = () => (
  <>
    Close menu
    <Image src="/icons/close.svg" width={30} height={30} alt="Close menu" />
  </>
);
TrailingIcon.args = {
  children: childTrailingIcon(),
  isDisabled: false,
  size: ButtonSize.md,
  color: ButtonColor.primary,
};
