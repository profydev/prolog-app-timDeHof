import React from "react";
import { Button } from "@features/ui";
import { ListItem, Anchor, Icon } from "./error-item-link";

type ErrorItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed?: boolean;
};

export function ErrorItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
}: ErrorItemProps) {
  return (
    <ListItem className={className}>
      <Anchor as={Button} onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {!isCollapsed && text} <Icon src={iconSrc} alt={`${text} icon`} />
      </Anchor>
    </ListItem>
  );
}
