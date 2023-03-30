import React from "react";
import styled from "styled-components";
import { color, breakpoint } from "@styles/theme";
import { SocialProofItem } from "./socialProofItem";
import {
  SectionSocialProof,
  BackgroundTheme,
} from "@typings/landingPages.types";

const SocialProof = styled.section<{ bgTheme: BackgroundTheme }>`
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
  padding: 0px 32px 96px;
  gap: 32px;

  & p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${color("gray", 500)};
    text-align: center;
  }

  & div {
    display: grid;
    grid-template-columns: auto auto;
    gap: 32px;
    padding: 0px;
  }
  @media (min-width: ${breakpoint("desktop")}) {
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export const SocialProofSection = ({ data }: { data: SectionSocialProof }) => {
  const { theme, title, companies } = data;
  return (
    <SocialProof bgTheme={theme}>
      <p>{title}</p>
      <div>
        {companies.map((company, index) => {
          return <SocialProofItem key={`sp-${index}`} data={company} />;
        })}
      </div>
    </SocialProof>
  );
};
