import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { NavigationContext } from "../sidebar-navigation";
import { ErrorItemButton } from "./error-item-button";
import { breakpoint, color, space, textFont } from "@styles/theme";
import { useRouter } from "next/router";

const containerStyles = css`
  display: flex;
  flex-direction: row;
  height: 3.25rem;

  height: ${({ theme }) => theme.size.footerHeight};
  @media (max-width: ${breakpoint("mobile")}) {
    position: relative;
    max-width: 500px;
    height: ${space(16)} + ${space(2)};
  }
`;

const FixedContainer = styled.div<{ isCollapsed: boolean }>`
  ${containerStyles}
  width: 100%;
`;

const ErrorLogo = styled.img`
  width: ${space(5)};
  color: ${color("error", 700)};
  margin-right: ${space(2)};
`;

const ErrorContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4)};
  background: ${color("error", 25)};
  border: 1px solid ${color("error", 300)};
  border-radius: ${space(2)};
  position: relative;

  p {
    color: ${color("error", 700)};
    ${textFont("sm", "medium")};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const TryAgainItem = styled(ErrorItemButton)`
  color: inherit;
  ${textFont("sm", "medium")};
`;

export function Error() {
  const router = useRouter();
  const { isSidebarCollapsed } = useContext(NavigationContext);
  return (
    <FixedContainer isCollapsed={isSidebarCollapsed}>
      <ErrorContainer data-cy="errorContainer">
        <List>
          <ErrorLogo src={"/icons/error.svg"} alt="error-icon" />
          <p data-cy="ErrorMsg">
            There was a problem while loading the project data
          </p>
        </List>
        <TryAgainItem
          text="Try Again"
          iconSrc="/icons/arrow-right.svg"
          onClick={() => router.reload()}
        />
      </ErrorContainer>
    </FixedContainer>
  );
}
