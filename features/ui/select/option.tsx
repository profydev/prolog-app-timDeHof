import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { useSelectContext } from "./select-context";
import { color, textFont } from "@styles/theme";
type OptionProps = {
  children: ReactNode | ReactNode[];
  value: string;
  name?: string;
  handleCallback?: (value: string) => unknown;
};

const ListItem = styled.li.attrs(() => ({
  tabIndex: 0,
}))<{ isCurrentlySelected: boolean }>`
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding-inline: 0.75rem;
  padding-block: calc(0.75rem - 0.1rem);
  ${textFont("md", "regular")}
  cursor: pointer;
  z-index: 100;
  color: ${color("gray", 900)};
  background-color: #fff;
  box-sizing: border-box;
  ${({ isCurrentlySelected }) =>
    isCurrentlySelected &&
    css`
      background-color: #fcfaff;
    `};
  &:hover {
    background: #f4ebff;
  }
`;
const ListItemIcon = styled.img<{ isCurrentlySelected: boolean }>`
  display: ${({ isCurrentlySelected }) =>
    isCurrentlySelected ? "block" : "none"};
  padding: 0;
  width: 1rem;
  height: 1rem;
`;

export function Option({ children, value, handleCallback }: OptionProps) {
  const { changeSelectedOption, selectedOption } = useSelectContext();
  const isCurrentlySelected = selectedOption === value;
  return (
    <ListItem
      data-testid="test-options"
      isCurrentlySelected={isCurrentlySelected}
      aria-selected={isCurrentlySelected}
      onClick={() => {
        changeSelectedOption(value);
        if (handleCallback) {
          handleCallback(value);
        }
      }}
      role="option"
    >
      {children}
      <ListItemIcon
        isCurrentlySelected={isCurrentlySelected}
        src="/icons/check.svg"
      />
    </ListItem>
  );
}
