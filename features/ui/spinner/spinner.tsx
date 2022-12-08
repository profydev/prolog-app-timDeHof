import React from "react";
import styled, { css } from "styled-components";
import { color, space } from "@styles/theme";

export enum SpinnerSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export enum SpinnerColor {
  primary = "primary",
  gray = "gray",
  error = "critical",
  critical = "critical",
  warning = "warning",
  success = "stable",
  info = "info",
}

type SpinnerProps = {
  size?: SpinnerSize;
  color?: SpinnerColor;
};

const SpinnerOverlay = styled.div<{ size: SpinnerSize }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(prop) => {
    switch (prop.size) {
      case SpinnerSize.sm:
        return css`
          height: 20vh;
        `;
      case SpinnerSize.md:
        return css`
          height: 40vh;
        `;
      case SpinnerSize.lg:
        return css`
          height: 60vh;
        `;
    }
  }}
`;

const SpinnerContainer = styled.div<{ size: SpinnerSize; color: SpinnerColor }>`
  display: inline-block;
  border-radius: ${space(24)};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  ${(props) => {
    switch (props.size) {
      case SpinnerSize.sm:
        return css`
          width: 1.5625rem;
          height: 1.5625rem;
        `;
      case SpinnerSize.md:
        return css`
          width: 3.125rem;
          height: 3.125rem;
        `;
      case SpinnerSize.lg:
        return css`
          width: 6.5rem;
          height: 6.5rem;
        `;
    }
  }}
  ${(props) => {
    switch (props.color) {
      case SpinnerColor.gray:
        return css`
          border: ${space(2)} solid ${color("gray", 300)};
          border-top-color: ${color("gray", 600)};
        `;
      case SpinnerColor.critical:
        return css`
          border: ${space(2)} solid ${color("error", 300)};
          border-top-color: ${color("error", 600)};
        `;
      case SpinnerColor.warning:
        return css`
          border: ${space(2)} solid ${color("warning", 300)};
          border-top-color: ${color("warning", 600)};
        `;
      case SpinnerColor.success:
        return css`
          border: ${space(2)} solid ${color("success", 300)};
          border-top-color: ${color("success", 600)};
        `;
      case SpinnerColor.primary:
        return css`
          border: ${space(2)} solid ${color("primary", 300)};
          border-top-color: ${color("primary", 600)};
        `;
    }
  }}
`;

export function Spinner({
  size = SpinnerSize.md,
  color = SpinnerColor.primary,
}: SpinnerProps) {
  return (
    <SpinnerOverlay size={size}>
      <SpinnerContainer data-cy="spinner" size={size} color={color} />
    </SpinnerOverlay>
  );
}
