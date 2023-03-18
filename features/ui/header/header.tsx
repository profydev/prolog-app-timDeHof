import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Routes } from "@config/routes";
import { HeaderItemLink } from "./header-item-link";
import { breakpoint } from "@styles/theme";
import { useWindowSize } from "react-use";
import {
  CustomButton,
  ButtonSize,
  ButtonColor,
} from "@features/ui/button/customButton";
const headerItems = [
  { text: "Home", href: Routes.home },
  { text: "Products", href: Routes.products },
  { text: "Documentation", href: Routes.documentation },
  { text: "Pricing", href: Routes.pricing },
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
  @media (max-width: ${breakpoint("mobile")}) {
    display: none;
  }
`;

const LinkList = styled(List)`
  flex: 1;
  justify-content: center;
`;

const DashboardButton = styled(CustomButton)`
  display: block;
  @media screen (max-width: ${breakpoint("mobile")}) {
    display: none;
  }
`;

const HamburgerButton = styled(CustomButton)`
  display: none;
  @media screen (max-width: ${breakpoint("mobile")}) {
    display: block;
  }
`;
export const Header = () => {
  const { width } = useWindowSize();
  const breakpoint = 1024;
  const onMobile = typeof window !== "undefined" && width <= breakpoint;
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return (
    <div>
      <HeaderWrapper>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-cy="test-logo"
          src="/icons/logo-large.svg"
          alt="Prolog logo"
        />
        <LinkList>
          {headerItems.map((item, index) => (
            <HeaderItemLink data-cy="header-link" key={index} {...item} />
          ))}
        </LinkList>
        {onMobile ? (
          <HamburgerButton
            data-test="hamburger-button"
            href={Routes.projects}
            size={ButtonSize.lg}
            color={ButtonColor.empty}
            iconSrc="/icons/hamburger.svg"
          />
        ) : (
          <DashboardButton
            data-test="dashboard-button"
            href={Routes.projects}
            size={ButtonSize.sm}
            color={ButtonColor.primary}
            text="Open Dashboard"
          />
        )}
      </HeaderWrapper>
    </div>
  );
};
