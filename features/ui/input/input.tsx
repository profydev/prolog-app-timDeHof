import React, { FC, InputHTMLAttributes, useState } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export type InputProps = {
  id: string;
  name: string;
  type: string;
  label?: string;
  iconSrc?: string;
  hintText?: string;
  hasIcon?: boolean;
  state?: InputStates;
  setError?: boolean;
  inputValue?: string;
  onChange?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export enum InputStates {
  Empty = "empty",
  Filled = "filled",
  Focused = "focused",
  Disabled = "disabled",
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")};
`;

const CustomInput = styled.input<{
  iconSrc?: string;
  hasIcon?: boolean;
  state?: InputStates;
  setError?: boolean;
}>`
  ${textFont("md", "regular")}
  cursor: text;
  border-radius: 0.5rem;
  padding: 10px 14px;
  min-width: 320px;
  padding-left: ${(props) => (props.iconSrc ? "2.625rem" : "0.875rem")};
  padding-right: ${(props) => (props.setError ? "2.375rem" : "0.875rem")};
  gap: 0.5rem;
  background: ${(props) =>
    props.iconSrc
      ? `url(${props.iconSrc}) left 15.7px center no-repeat`
      : props.setError
      ? "url(/icons/error.svg) right 15.3px center no-repeat"
      : "#FFF"};
  border: 1px solid
    ${(props) => (props.setError ? color("error", 300) : color("gray", 300))};

  &:focus {
    outline: none;
    border: 1px solid
      ${(props) =>
        props.setError ? color("error", 300) : color("primary", 300)};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
      0px 0px 0px 4px ${(props) => (props.setError ? "#FEE4E2" : "#f4ebff")};
  }
  ${(props) => {
    switch (props.state) {
      case InputStates.Empty:
        return css`
          color: color("gray", 500);
        `;
      case InputStates.Filled:
        return css`
          color: ${color("gray", 900)};
        `;
      case InputStates.Focused:
        return css`
          border: 1px solid
            ${props.setError ? color("error", 300) : color("primary", 300)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px ${props.setError ? "#FEE4E2" : "#f4ebff"};
        `;
      case InputStates.Disabled:
        return css`
          pointer-events: none;
          cursor: not-allowed;
          background-color: ${color("gray", 50)};
          color: ${color("gray", 300)};
        `;
    }
  }}
`;

const InputHint = styled.div<{ setError?: boolean }>`
  display: block;
  margin-top: 6px;
  color: ${(props) =>
    props.setError ? color("error", 300) : color("gray", 500)};
  ${textFont("sm", "regular")};
`;

export const Input: FC<InputProps> = ({
  id,
  name,
  label,
  hintText,
  type = "text",
  hasIcon,
  iconSrc,
  setError,
  inputValue = "",
  state,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(inputValue);

  return (
    <InputContainer>
      {label && <Label htmlFor={name}>{label}</Label>}
      <CustomInput
        id={id}
        name={name}
        type={type}
        setError={setError}
        hasIcon={hasIcon}
        iconSrc={iconSrc}
        state={state}
        value={value}
        onFocus={() => (state = InputStates.Focused)}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        {...rest}
      />
      {hintText && (
        <InputHint setError={setError}>
          {setError ? "This is an error message" : hintText}
        </InputHint>
      )}
    </InputContainer>
  );
};
