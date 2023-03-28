import styled from "styled-components";
import { Header } from "@features/ui/header";
import { HeroSection } from "@feature/ui/hero-section";
import { SocialProofSection } from "@features/ui/social-proof-section";
import { GetServerSideProps } from "next";
import { TLandingPage } from "@Typings/landingPages.types";
const ContactButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1rem;
  background: #7f56d9;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: none;
  cursor: pointer;

  &:hover {
    background: #6941c6;
  }
`;

const IssuesPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <SocialProofSection />
      <ContactButton
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal"
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </div>
  );
};

export default IssuesPage;

export const getServerSideProps: GetServerSideProps<{
  data: TLandingPage,
}> = async (context) => {
  const res = await fetch("https://prolog-api.profy.dev/content-page/home");
  const data: TLandingPage = await res.json();

  return {
    props: {
      data,
    },
  };
};
