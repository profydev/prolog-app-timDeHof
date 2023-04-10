import React from "react";
import styled from "styled-components";
import { Routes } from "@config/routes";
import { HeaderItemLink } from "./header-item-link";
import { space, breakpoint } from "@styles/theme";
import {
  CustomButton,
  ButtonSize,
  ButtonColor,
  ButtonIcon,
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

const Logo = styled.img`
  width: 7.375rem;

  @media (min-width: ${breakpoint("desktop")}) {
    margin: ${space(0, 4)};
  }
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
  @media (max-width: ${breakpoint("mobile")}) {
    display: none;
  }
`;

const HamburgerButton = styled(CustomButton)`
  display: none;
  @media (max-width: ${breakpoint("mobile")}) {
    display: block;
  }
`;
export const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Logo data-cy="test-logo" src={"/icons/logo-large.svg"} alt="logo" />
        <LinkList>
          {headerItems.map((item, index) => (
            <HeaderItemLink data-cy="header-link" key={index} {...item} />
          ))}
        </LinkList>

        <DashboardButton
          data-cy="dashboard-button"
          className="dashboardButton"
          href={Routes.projects}
          size={ButtonSize.sm}
          color={ButtonColor.primary}
          text="Open Dashboard"
        />

        <HamburgerButton
          data-cy="hamburger-button"
          className="hamburgerButton"
          href={Routes.projects}
          size={ButtonSize.sm}
          color={ButtonColor.empty}
          iconlocation={ButtonIcon.only}
          iconSrc="/icons/hamburger.svg"
        />
      </HeaderWrapper>
    </>
  );
};
