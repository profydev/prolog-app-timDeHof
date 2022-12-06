import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { color, space, textFont } from "@styles/theme";

type FooterItemProps = {
  text: string;
  href: string;
  isActive?: boolean;
};

export const ListItem = styled.li<{ isActive?: boolean }>`
  height: ${space(12)};
  display: flex;
  align-items: center;
  margin-top: ${space(1)};
  padding: ${space(0, 3)};
  background: ${(props) =>
    props.isActive ? color("gray", 500)(props) : "transparent"};
  border-radius: 6px;
  ${textFont("md", "medium")}
`;

export const Anchor = styled(Link)`
  display: flex;
  align-items: center;
  color: ${color("gray", 500)};
  text-decoration: none;
`;

export const Icon = styled.img`
  width: ${space(6)};
  margin-right: ${space(3)};
`;

export function FooterItemLink({
  text,
  href,

  isActive,
}: FooterItemProps) {
  return (
    <ListItem isActive={isActive}>
      <Anchor href={href}>{text}</Anchor>
    </ListItem>
  );
}
