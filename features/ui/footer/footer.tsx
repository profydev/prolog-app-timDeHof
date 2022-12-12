import { useContext } from "react";
import styled, { css } from "styled-components";
import { FooterItemLink } from "./footer-item-link";
import { breakpoint, color, space } from "@styles/theme";
import { NavigationContext } from "../sidebar-navigation/navigation-context";

const footerItems = [
  { text: "Docs", href: "/#" },
  { text: "API", href: "/#" },
  { text: "Help", href: "/#" },
  { text: "Community", href: "/#" },
];

const containerStyles = css`
  display: flex;
  flex-direction: row;
  bottom: 0;
  right: 0;

  height: ${({ theme }) => theme.size.footerHeight};
  @media (max-width: ${breakpoint("mobile")}) {
    position: relative;
    height: 8rem;
  }
`;

const FixedContainer = styled.div<{ isCollapsed: boolean }>`
  ${containerStyles}
  margin-top: auto;
  width: 100%;
  @media (min-width: ${breakpoint("desktop")}) {
    ${(props) =>
      props.isCollapsed
        ? css`
            width: calc(100% - ${space(20)});
          `
        : css`
            width: calc(100% - 3 * ${space(24)} + ${space(2)});
          `}
  }
`;

const Footer = styled.footer`
  width: calc(100% - 2 * ${space(2)});
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(0, 2)};
  background: ${color("gray", 50)};
  position: relative;

  @media (min-width: ${breakpoint("desktop")}) {
    padding: ${space(8, 4, 6)};
  }

  @media (max-width: ${breakpoint("mobile")}) {
    flex-direction: column;
    height: 8rem;
  }
`;

const Logo = styled.img`
  width: 1.375rem;
  order: 3;
  @media (min-width: ${breakpoint("desktop")}) {
    margin: ${space(0, 4)};
  }
  @media (max-width: ${breakpoint("mobile")}) {
    order: 2;
  }
`;

const List = styled.ul`
  order: 2;
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  @media (max-width: ${breakpoint("mobile")}) {
    order: -1;
  }
`;

const LinkList = styled(List)`
  flex: 1;
  justify-content: center;
`;

const Version = styled.p`
  order: 1;
  color: ${color("gray", 400)};
  @media (max-width: ${breakpoint("mobile")}) {
    order: 3;
  }
`;
// create a footer component
export function FooterBar() {
  const { isSidebarCollapsed } = useContext(NavigationContext);
  return (
    <FixedContainer isCollapsed={isSidebarCollapsed}>
      <Footer>
        <Version>version: {process.env.NEXT_PUBLIC_APP_VERSION}</Version>
        <LinkList>
          {footerItems.map((footerItem, index) => (
            <FooterItemLink key={index} {...footerItem} />
          ))}
        </LinkList>
        <Logo src={"/icons/logo-small.svg"} alt="logo" />
      </Footer>
    </FixedContainer>
  );
}
