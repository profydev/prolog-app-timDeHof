import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HeroSection } from "./herosection";
import { SectionTypes } from "@typings/landingPages.types";

export default {
  title: "UI/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = (args) => (
  <HeroSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    sectionType: SectionTypes.hero,
    theme: "light-gray",
    title: "Your Application Issues In Sight. At All Times.",
    subtitle:
      "Powerful error tracking and monitoring for software applications. Trusted by over 4,000 startups.",
    image: {
      src: "/images/home-hero-macbook.png",
      width: 768,
      height: 449,
    },
  },
};
Default.parameters = {
  viewMode: "docs",
};
