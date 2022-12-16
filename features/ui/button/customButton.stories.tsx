import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  CustomButton,
  ButtonSize,
  ButtonColor,
  ButtonIcon,
} from "./customButton";

export default {
  title: "UI/button",
  component: CustomButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = ({
  isDisabled,
  size,
  color,
  icon,
}) => (
  <div style={{ padding: 50 }}>
    <CustomButton isDisabled={isDisabled} size={size} color={color} icon={icon}>
      Button CTA
    </CustomButton>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isDisabled: false,
  size: ButtonSize.md,
  color: ButtonColor.primary,
  icon: ButtonIcon.leading,
};
