import React, { FC, ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { color, textFont, space } from "@styles/theme";
import { Button } from "./button";
import Link from "next/link";
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
  error = "error",
}

export enum ButtonIcon {
  none = "none",
  only = "only",
  leading = "leading",
  trailing = "trailing",
}

type ButtonProps = {
  iconSrc?: string;
  text?: string;
  size: ButtonSize;
  href?: string;
  color: ButtonColor;
  isDisabled?: boolean;
  iconLocation?: ButtonIcon;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const containerStyles = css`
  border-radius: 8px;
  /* display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; */
`;

const StyledButton = styled(Button)<{
  size: ButtonSize;
  color: ButtonColor;
  isDisabled: boolean;
}>`
  ${containerStyles}

  ${(props) => {
    return css`
      cursor: ${props.isDisabled ? "not-allowed" : "pointer"};
    `;
  }}

  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          padding: ${space(2)} 0.875rem;
          ${textFont("sm", "medium")};
        `;

      case ButtonSize.md:
        return css`
          padding: 0.625rem ${space(4)};
          ${textFont("sm", "medium")};
        `;

      case ButtonSize.lg:
        return css`
          padding: 0.625rem 1.125rem;
          ${textFont("md", "medium")};
        `;

      case ButtonSize.xl:
        return css`
          padding: ${space(3, 5)};
          ${textFont("md", "medium")};
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

const StyledLink = styled(Link)<{
  size: ButtonSize;
  color: ButtonColor;
  isDisabled: boolean;
}>`
  ${containerStyles}
  text-decoration: none;
  ${(props) => {
    return css`
      cursor: ${props.isDisabled ? "not-allowed" : "pointer"};
    `;
  }}

  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          padding: ${space(2)} 0.875rem;
          ${textFont("sm", "medium")};
        `;

      case ButtonSize.md:
        return css`
          padding: 0.625rem ${space(4)};
          ${textFont("sm", "medium")};
        `;

      case ButtonSize.lg:
        return css`
          padding: 0.625rem 1.125rem;
          ${textFont("md", "medium")};
        `;

      case ButtonSize.xl:
        return css`
          padding: ${space(3, 5)};
          ${textFont("md", "medium")};
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

const Icon = styled.img`
  height: 13px;
`;
const Text = styled.p`
  margin: 0;
  ${textFont("md", "medium")}
`;
export const CustomButton: FC<ButtonProps> = ({
  text,
  size = ButtonSize.md,
  iconSrc,
  href,
  isDisabled = false,
  color = ButtonColor.primary,
  ...OtherProps
}) =>
  href ? (
    <StyledLink isDisabled={isDisabled} size={size} color={color} href={href}>
      {iconSrc && <Icon src={iconSrc} />} {text && <Text>{text}</Text>}
    </StyledLink>
  ) : (
    <StyledButton
      isDisabled={isDisabled}
      size={size}
      color={color}
      {...OtherProps}
    >
      {iconSrc && <Icon src={iconSrc} />} {text && <Text>{text}</Text>}
    </StyledButton>
  );
