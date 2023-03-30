import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Companies } from "@typings/landingPages.types";
const SocialProofContainer = styled.div`
  width: 100%;
  > div {
    position: unset !important;
  }
  & img {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;

export const SocialProofItem = ({ data }: { data: Companies }) => {
  const { name, logo } = data;
  return (
    <SocialProofContainer>
      <Image
        src={`https://prolog-api.profy.dev${logo}`}
        alt={`${name}-logo`}
        fill
      />
    </SocialProofContainer>
  );
};
