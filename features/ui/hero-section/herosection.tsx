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
  gap: 64px;
  & img {
    max-width: 100%;
    height: auto;
  }
`;
const Context = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 96px 112px 0 112px;
  gap: 24px;
`;

const Title = styled.h1`
  color: ${color("gray", 900)};
  font-size: clamp(36px, 29px + 2.15vw, 60px);
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0;
`;
const Subtitle = styled.p`
    color: ${color("gray", 500)};
    margin: 0;
    font-size:clamp(18px, 19px, 20px);
    line-height: 1.875rem;
    text-align: center;
  @media (min-width: ${breakpoint("desktop")}) {
    {
      white-space: pre;
    }
`;

export const HeroSection = ({ data }: { data: SectionHero }) => {
  const { title, subtitle, image, theme } = data;

  return (
    <Hero bgTheme={theme}>
      <Context>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Context>
      <Image
        src={`https://prolog-api.profy.dev${image.src}`}
        width={image.width}
        height={image.height}
        alt="hero image"
      />
    </Hero>
  );
};
