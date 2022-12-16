import React from "react";
import styled, { css } from "styled-components";
import { color, textFont, space } from "@styles/theme";
import { Button } from "./button";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "empty-gray",
  error = "critical",
}

export enum ButtonIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
}

type ButtonProps = {
  children?: React.ReactNode;
  size: ButtonSize;
  color: ButtonColor;
  isDisabled: boolean;
  icon: ButtonIcon;
  onClick?: () => void;
};

const ButtonContainer = styled(Button)<{
  size: ButtonSize;
  color: ButtonColor;
  isDisabled: boolean;
}>`
  border-radius: 8px;

  ${(props) => {
    return css`
      cursor: ${props.isDisabled ? "not-allowed" : "pointer"};
    `;
  }}

  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          padding: ${space(2, 3)};
          width: ${space(24)} + ${space(2)};
          height: ${space(8)} + ${space(1)};
        `;

      case ButtonSize.md:
        return css`
          padding: ${space(2, 4)};
          width: ${space(24)} + ${space(3)};
          height: ${space(10)};
        `;

      case ButtonSize.lg:
        return css`
          padding: ${space(2, 4)};
          width: ${space(24)} + ${space(5)} + ${space(2)};
          height: ${space(10)} + ${space(1)};
        `;

      case ButtonSize.xl:
        return css`
          padding: ${space(3, 5)};
          width: ${space(24)} + ${space(8)};
          height: ${space(12)};
        `;
    }
  }}

  ${(props) => {
    switch (props.color) {
      case ButtonColor.primary:
        return css`
          background: ${props.isDisabled
            ? color("primary", 200)
            : color("primary", 600)};
          border: 1px solid
            ${props.isDisabled ? color("primary", 200) : color("primary", 600)};
          color: #fff;

          &:hover {
            background: ${color("primary", 700)};
            border-color: ${color("primary", 700)};
          }

          &:focus {
            background: ${color("primary", 600)};
            border-color: ${color("primary", 600)};
          }
        `;
      case ButtonColor.secondary:
        return css`
          background: ${props.isDisabled
            ? color("primary", 25)
            : color("primary", 50)};
          border: 1px solid
            ${props.isDisabled ? color("primary", 25) : color("primary", 50)};
          color: ${props.isDisabled
            ? color("primary", 300)
            : color("primary", 700)};

          &:hover {
            background: ${color("primary", 100)};
            border-color: ${color("primary", 100)};
          }

          &:focus {
            background: ${color("primary", 50)};
            border-color: ${color("primary", 100)};
          }
        `;
      case ButtonColor.gray:
        return css`
          background: #fff;
          border: 1px solid
            ${props.isDisabled ? color("gray", 200) : color("gray", 300)};
          color: ${props.isDisabled ? color("gray", 300) : color("gray", 700)};

          &:hover {
            background: ${color("gray", 50)};
            border-color: ${color("gray", 300)};
          }

          &:focus {
            background: #fff;
            border-color: ${color("primary", 300)};
          }
        `;
      case ButtonColor.empty:
        return css`
          background: transparent;
          border: none;
          color: ${props.isDisabled
            ? color("gray", 300)
            : color("primary", 700)};

          &:hover {
            background: ${color("primary", 50)};
          }

          &:focus {
            background: transparent;
          }
        `;
      case ButtonColor.emptyGray:
        return css`
          background: transparent;
          border: none;
          color: ${props.isDisabled ? color("gray", 300) : color("gray", 500)};

          &:hover {
            background: ${color("gray", 50)};
          }

          &:focus {
            background: transparent;
          }
        `;
      case ButtonColor.error:
        return css`
          background: ${props.isDisabled
            ? color("error", 200)
            : color("error", 600)};
          border: 1px solid
            ${props.isDisabled ? color("error", 200) : color("error", 600)};
          color: #fff;

          &:hover {
            background: ${color("error", 700)};
            border-color: ${color("error", 700)};
          }

          &:focus {
            background: ${color("error", 600)};
            border-color: ${color("error", 600)};
          }
        `;
    }
  }}
`;

const ContentContainer = styled.div<{ icon: ButtonIcon }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${space(1)};
  ${(props) => {
    switch (props.icon) {
      case ButtonIcon.leading:
        return css`
          flex-direction: row;
        `;
      case ButtonIcon.trailing:
        return css`
          flex-direction: row-reverse;
        `;
    }
  }}
`;
const Text = styled.h1<{ size: ButtonSize; icon: ButtonIcon }>`
  margin: 0;
  ${(props) => {
    if (props.icon === ButtonIcon.only) {
      return css`
        display: none;
      `;
    }
  }}
  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          ${textFont("sm", "medium")};
        `;
      case ButtonSize.md:
        return css`
          ${textFont("sm", "medium")};
        `;
      case ButtonSize.lg:
        return css`
          ${textFont("md", "medium")};
        `;
      case ButtonSize.xl:
        return css`
          ${textFont("md", "medium")};
        `;
    }
  }}
`;
const Icon = styled.div<{ color: ButtonColor; isDisabled: boolean }>`
  width: ${space(2)};
  height: ${space(2)};
  border: 1.67px solid #fff;
  border-radius: 50%;

  ${(props) => {
    switch (props.color) {
      case ButtonColor.secondary:
        return css`
          border-color: ${props.isDisabled
            ? color("primary", 300)
            : color("primary", 700)};
        `;
      case ButtonColor.gray:
        return css`
          border-color: ${props.isDisabled
            ? color("gray", 300)
            : color("gray", 700)};
        `;
      case ButtonColor.empty:
        return css`
          border-color: ${props.isDisabled
            ? color("gray", 300)
            : color("primary", 700)};
        `;
      case ButtonColor.emptyGray:
        return css`
          border-color: ${props.isDisabled
            ? color("gray", 300)
            : color("gray", 500)};
        `;
    }
  }}
`;

export function CustomButton({
  children,
  onClick,
  isDisabled = false,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  icon = ButtonIcon.leading,
}: ButtonProps) {
  return (
    <ButtonContainer isDisabled={isDisabled} size={size} color={color}>
      <ContentContainer onClick={onClick} icon={icon}>
        <Icon color={color} isDisabled={isDisabled} />
        <Text size={size} icon={icon}>
          {children}
        </Text>
      </ContentContainer>
    </ButtonContainer>
  );
}
