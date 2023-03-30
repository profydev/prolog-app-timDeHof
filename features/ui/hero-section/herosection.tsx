import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import { SectionHero, BackgroundTheme } from "@typings/landingPages.types";

const Hero = styled.section<{ bgTheme: BackgroundTheme }>`
  background: ${({ bgTheme }) => {
    switch (bgTheme) {
      case "light-gray":
        return color("gray", 50);
      default:
        return "#fff";
    }
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  & h1 {
    color: ${color("gray", 900)};
    font-size: 3.75rem;
    font-family: "Inter";
    font-weight: 600;
    font-style: normal;
    line-height: 4.5rem;
    text-align: center;
    letter-spacing: -0.02em;
  }
  & p {
    color: ${color("gray", 500)};
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.875rem;
    text-align: center;
  }
  & img {
    width: 100%;
    height: auto;
  }

  @media (min-width: ${breakpoint("desktop")}) {
    & p {
      white-space: pre;
    }
  }
`;

export const HeroSection = ({ data }: { data: SectionHero }) => {
  const { title, subtitle, image, theme } = data;
  return (
    <Hero bgTheme={theme}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Image
        src={`https://prolog-api.profy.dev${image.src}`}
        width={image.width}
        height={image.height}
        alt="hero image"
      />
    </Hero>
  );
};
