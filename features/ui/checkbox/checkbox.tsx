import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}
export enum CheckboxState {
  Unchecked = "unchecked",
  Checked = "checked",
  PartlyChecked = "partlyChecked",
}

export type CheckboxProps = {
  size: CheckboxSize;
  state: CheckboxState;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
  value?: string;
};

const CheckboxContainer = styled.div<{ size: CheckboxSize }>`
  display: flex;
  vertical-align: middle;
  ${(props) => {
    switch (props.size) {
      case CheckboxSize.sm:
        return css`
          ${textFont("sm", "medium")}
        `;
      case CheckboxSize.md:
        return css`
          ${textFont("md", "medium")}
        `;
    }
  }}
`;

const Icon = styled.svg<{ disabled: boolean }>`
  width: 100%;
  height: 100%;
  fill: none;
  stroke: ${(props) =>
    props.disabled ? color("gray", 300) : color("primary", 700)};
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  background-position: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: none;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: relative;
  white-space: nowrap;
`;

const StyledCheckbox = styled.div<{
  state: CheckboxState;
  disabled: boolean;
  size: CheckboxSize;
}>`
  display: inline-block;
  width: ${(props) => (props.size === CheckboxSize.sm ? "1rem" : "1.3rem")};
  height: ${(props) => (props.size === CheckboxSize.sm ? "1rem" : "1.3rem")};
  border: 1px solid ${color("gray", 300)};
  border-radius: ${(props) =>
    props.size === CheckboxSize.sm ? "0.3rem" : "0.4rem"};
  ${(props) => {
    switch (props.state) {
      case CheckboxState.Unchecked:
        return css`
          background: ${props.disabled ? color("gray", 100) : "#FFF"};
          border-color: ${
            props.disabled ? color("gray", 200) : color("gray", 300)
          };
          &:hover {
            background: ${
              props.disabled ? color("gray", 100) : color("primary", 50)
            };
            border-color: ${
              props.disabled ? color("gray", 200) : color("primary", 600)
            };
              }
          &:focus {
            background: "#FFF";
            outline: color("primary", 300);
            box-shadow: 0 0 0 4px color("primary", 100);
            }
          }
        `;
      case CheckboxState.Checked:
        return css`
          background: ${props.disabled
            ? color("gray", 100)
            : color("primary", 50)};
          border-color: ${props.disabled
            ? color("gray", 200)
            : color("gray", 300)};
          &:hover {
            background: ${props.disabled
              ? color("gray", 100)
              : color("primary", 50)};
            border-color: ${props.disabled
              ? color("gray", 200)
              : color("primary", 600)};
          }
          &:focus {
            background: "#FFF";
            outline: color("primary", 300);
            box-shadow: 0 0 0 4px color("primary", 100);
          }
        `;
      case CheckboxState.PartlyChecked:
        return css`
          background: ${props.disabled ? color("gray", 100) : "#FFF"};
          border-color: ${
            props.disabled ? color("gray", 200) : color("gray", 300)
          };
          &:hover {
            background: ${
              props.disabled ? color("gray", 100) : color("primary", 50)
            };
            border-color: ${
              props.disabled ? color("gray", 200) : color("primary", 600)
            };
              }
          &:focus {
            background: "#FFF";
            outline: color("primary", 300);
            box-shadow: 0 0 0 4px color("primary", 100);
            }
          }
        `;
    }
  }}
  transition: all 150ms;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  ${(props) =>
    props.state === CheckboxState.PartlyChecked &&
    css`
      background: ${color("primary", 50)};
      border-color: ${color("primary", 600)};
    `}
`;

const CheckboxText = styled.div<{ size: CheckboxSize; disabled: boolean }>`
  ${(props) => {
    switch (props.size) {
      case CheckboxSize.sm:
        return css`
          ${textFont("sm", "medium")}
          margin-left: 0.5rem;
        `;
      case CheckboxSize.md:
        return css`
          ${textFont("md", "medium")}
          margin-left: 0.8rem;
        `;
    }
  }}
  color: ${(props) =>
    props.disabled ? color("gray", 300) : color("gray", 700)};
`;

export const Checkbox = ({
  state,
  disabled,
  size,
  text,
  onChange,
}: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <CheckboxContainer size={size}>
      <HiddenCheckbox
        ref={ref}
        checked={state === CheckboxState.Checked}
        disabled={disabled}
        onChange={onChange}
      />
      <StyledCheckbox
        state={state}
        disabled={disabled}
        size={size}
        onChange={handleChange}
      >
        {state === CheckboxState.PartlyChecked ? (
          <Icon viewBox="0 0 10 2" disabled={disabled}>
            <path d="M1.5 1H8.5" />
          </Icon>
        ) : (
          state === CheckboxState.Checked && (
            <Icon viewBox="0 0 10 8" disabled={disabled}>
              <path d="M9 1L3.5 6.5L1 4" />
            </Icon>
          )
        )}
      </StyledCheckbox>
      <CheckboxText size={size} disabled={disabled}>
        {text}
      </CheckboxText>
    </CheckboxContainer>
  );
};
