import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Companies } from "@typings/landingPages.types";
import { SocialProofItem } from "./socialProofItem";

export default {
  title: "UI/SocialProofSection/Items",
  component: SocialProofItem,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SocialProofItem>;

const Template: ComponentStory<typeof SocialProofItem> = (args: {
  data: Companies;
}) => {
  return (
    <div
      style={{
        padding: 50,
        width: 146,
        height: 48,
      }}
    >
      <SocialProofItem {...args} />
    </div>
  );
};
export const Layers = Template.bind({});
Layers.args = {
  data: {
    name: "Layers",
    logo: "/images/logo-layers.svg",
  },
};

export const Sisyphus = Template.bind({});
Sisyphus.args = {
  data: {
    name: "Sisyphus",
    logo: "/images/logo-sisyphus.svg",
  },
};

export const Circooles = Template.bind({});
Circooles.args = {
  data: {
    name: "Circooles",
    logo: "/images/logo-circooles.svg",
  },
};

export const Catalog = Template.bind({});
Catalog.args = {
  data: {
    name: "Catalog",
    logo: "/images/logo-catalog.svg",
  },
};

export const Quotient = Template.bind({});
Quotient.args = {
  data: {
    name: "Quotient",
    logo: "/images/logo-quotient.svg",
  },
};

export const Hourglass = Template.bind({});
Hourglass.args = {
  data: {
    name: "Hourglass",
    logo: "/images/logo-hourglass.svg",
  },
};
