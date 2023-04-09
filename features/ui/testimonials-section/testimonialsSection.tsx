import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { color, breakpoint, textFont } from "@styles/theme";
import {
  SectionTestimonials,
  BackgroundTheme,
} from "@typings/landingPages.types";

const Testimonials = styled.section<{ bgTheme: BackgroundTheme }>`
  background: ${({ bgTheme }) => {
    switch (bgTheme) {
      case "light-gray":
        return color("gray", 50);
      case "light":
        return "#fff";
      default:
        return "#fff";
    }
  }};
  display: flex;
  flex-direction: column;
  align-items; center;
  justify-content: center;
  @media (min-width: ${breakpoint("mobile")}) {
    margin-bottom: 64px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 64px;
  gap: 24px;
  & h1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    letter-spacing: -0.02em;
    padding: 0px;
    margin: 0;
    text-align: center;
    @media (min-width: ${breakpoint("mobile")}) {
      font-size: 64px;
    }
  }
  & p {
    color: ${color("gray", 500)};
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    margin: 0;
    text-align: center;
  }
`;
const TestimonialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 6rem;
  gap: 64px;
  @media (max-width: ${breakpoint("desktop")}) {
    flex-wrap: wrap;
    gap: 0;
    margin: 0;
  }
`;
const SupportText = styled.p`
  color: ${color("primary", 700)};
  ${textFont("sm", "regular")};
  margin: 0;
`;
const Testimonial = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  text-align: center;
  border-radius: 0;
  padding: 40px 24px;
  background-color: ${color("primary", 50)};
  @media (min-width: ${breakpoint("mobile")}) {
    border-radius: 1rem;
    max-width: 375px;
  }
  &:nth-child(2n) {
    background-color: ${color("gray", 50)};
  }
  &:nth-child(2n) ${SupportText} {
    color: ${color("gray", 500)};
  }
`;
const TestimonialTitle = styled.p`
  color: ${color("primary", 700)};
  ${textFont("sm", "semibold")};
`;
const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  & img {
    border-radius: 50%;
    margin-bottom: 1rem;
  }
`;
const QuoteText = styled.p`
  color: ${color("primary", 900)};
  flex: 1;
  margin: 0;
  margin-bottom: 24px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
`;
const UsernameText = styled.p`
  color: ${color("primary", 900)};
  ${textFont("md", "medium")};
  padding: 0;
  margin: 0;
`;
export const TestimonialsSection = ({
  data,
}: {
  data: SectionTestimonials;
}) => {
  const { theme, title, subtitle, testimonials } = data;
  return (
    <Testimonials bgTheme={theme}>
      <Content>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </Content>
      <TestimonialWrapper>
        {testimonials.map(
          (
            { title, text, userName, userRole, userCompany, userImage },
            index
          ) => {
            return (
              <Testimonial key={`t-${index}`}>
                <TestimonialTitle>{title}</TestimonialTitle>
                <QuoteText>{text}</QuoteText>
                <Avatar>
                  <Image
                    src={`https://prolog-api.profy.dev${userImage.src}`}
                    alt={`${userName}-avatar`}
                    width={userImage.width}
                    height={userImage.height}
                  />
                  <UsernameText>{userName}</UsernameText>
                  <SupportText>
                    {userRole}, {userCompany}
                  </SupportText>
                </Avatar>
              </Testimonial>
            );
          }
        )}
      </TestimonialWrapper>
    </Testimonials>
  );
};
