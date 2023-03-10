import React from "react";
import styled from "styled-components";
import { Routes } from "@config/routes";
import { HeaderItemLink } from "./header-item-link";

const headerItems = [
  { text: "Docs", href: "/#" },
  { text: "API", href: "/#" },
  { text: "Help", href: "/#" },
  { text: "Community", href: "/#" },
];

const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;
const List = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`;

const LinkList = styled(List)`
  flex: 1;
  justify-content: center;
`;
export const Header = () => {
  return (
    <div>
      <HeaderWrapper>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <LinkList>
          {headerItems.map((item, index) => (
            <HeaderItemLink key={index} {...item} />
          ))}
        </LinkList>
        <a href={Routes.projects}>Dashboard</a>
      </HeaderWrapper>
    </div>
  );
};
