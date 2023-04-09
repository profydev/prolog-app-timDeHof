import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TestimonialsSection } from "./testimonialsSection";
import { SectionTypes } from "@typings/landingPages.types";

export default {
  title: "UI/TestimonialsSection",
  component: TestimonialsSection,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TestimonialsSection>;

const Template: ComponentStory<typeof TestimonialsSection> = (args) => (
  <TestimonialsSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    sectionType: SectionTypes.testimonials,
    theme: "light",
    title: "Don’t Only Trust Our Words",
    subtitle: "Our customers around the globe share their opinions.",
    testimonials: [
      {
        title: "Frontend Development",
        text: "Prolog has saved us many times. We get an alert, investgate the error, and fix it. That simple.",
        userName: "Mollie Hall",
        userRole: "Web Developer",
        userCompany: "Sisyphus",
        userImage: {
          src: "/images/mollie-hall.jpg",
          width: 56,
          height: 56,
        },
      },
      {
        title: "Microservice Architectures",
        text: "Our services fail from time to time. That’s normal. But with Prolog we’re able to track the issue down in no time. ",
        userName: "Alec Whitten",
        userRole: "Software Architect",
        userCompany: "Layers",
        userImage: {
          src: "/images/alec-whitten.jpg",
          width: 56,
          height: 56,
        },
      },
      {
        title: "Backend Servers",
        text: "Prolog’s UI is beautiful and intuitive. It’s simple to find bugs and our devs are always on top of pressing issues.",
        userName: "Kelly Williams",
        userRole: "Engineering Manager",
        userCompany: "Catalog",
        userImage: {
          src: "/images/kelly-williams.jpg",
          width: 56,
          height: 56,
        },
      },
    ],
  },
};
