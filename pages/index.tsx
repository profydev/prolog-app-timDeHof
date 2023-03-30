import Head from "next/head";
import styled from "styled-components";
import { Header } from "@features/ui/header";
import { HeroSection } from "@features/ui/hero-section";
import {
  SectionHero,
  SectionSocialProof,
  SectionTestimonials,
  SectionTypes,
  TLandingPage,
} from "@typings/landingPages.types";
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
const PageWrapper = styled.div``;
const Main = styled.main``;

const IssuesPage = ({ data }: { data: TLandingPage }) => {
  const hero = data.sections.find(
    (section) => section.sectionType === SectionTypes.hero
  ) as SectionHero;

  return (
    <PageWrapper>
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
        <meta property="og:title" content={data.meta.title} />
        <meta property="og:description" content={data.meta.description} />
        <meta
          property="og:image"
          content={`https://prolog-api.profy.dev/${data.meta.image}`}
        />
      </Head>
      <Header />
      <Main>{hero && <HeroSection data={hero} />}</Main>
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
    </PageWrapper>
  );
};

export default IssuesPage;

export async function getStaticProps() {
  const res = await fetch(`https://prolog-api.profy.dev/content-page/home`);
  const data = await res.json();
  return { props: { data } };
}
