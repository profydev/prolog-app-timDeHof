import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialProofSection } from "./socialProofSection";
import { SectionTypes } from "@typings/landingPages.types";

export default {
  title: "UI/SocialProofSection",
  component: SocialProofSection,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SocialProofSection>;

const Template: ComponentStory<typeof SocialProofSection> = (args) => (
  <SocialProofSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    sectionType: SectionTypes.socialProof,
    theme: "light-gray",
    title: "Join 4,000+ companies using Prolog",
    companies: [
      {
        name: "Layers",
        logo: "/images/logo-layers.svg",
      },
      {
        name: "Sisyphus",
        logo: "/images/logo-sisyphus.svg",
      },
      {
        name: "Circooles",
        logo: "/images/logo-circooles.svg",
      },
      {
        name: "Catalog",
        logo: "/images/logo-catalog.svg",
      },
      {
        name: "Quotient",
        logo: "/images/logo-quotient.svg",
      },
      {
        name: "Hourglass",
        logo: "/images/logo-hourglass.svg",
      },
    ],
  },
};
Default.parameters = {
  viewMode: "docs",
};
