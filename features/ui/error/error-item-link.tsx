import Link from "next/link";

import React from "react";
import styled from "styled-components";
import { color, space } from "@styles/theme";

type ErrorItemProps = {
  text: string;
  iconSrc: string;
  href: string;
  isActive?: boolean;
  isCollapsed: boolean;
};

export const ListItem = styled.li<{ isActive?: boolean }>`
  height: ${space(12)};
  display: flex;
  align-items: center;
  border-radius: 6px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Anchor = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${color("error", 700)};
  text-decoration: none;
`;

export const Icon = styled.img`
  width: ${space(6)};
  transform: rotate(180deg);
  stroke: ${color("error", 700)};
`;

export function MenuItemLink({
  text,
  href,
  iconSrc,
  isActive,
  isCollapsed,
}: ErrorItemProps) {
  return (
    <ListItem isActive={isActive}>
      <Anchor href={href}>
        <Icon src={iconSrc} alt={`${text} icon`} /> {!isCollapsed && text}
      </Anchor>
    </ListItem>
  );
}
