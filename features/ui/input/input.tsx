import React, { FC, InputHTMLAttributes, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export type InputProps = {
  name: string;
  label?: string;
  hintText?: string;
  type: string;
  iconSrc?: string;
  state: InputStates;
  setError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export enum InputStates {
  Empty = "empty",
  Filled = "filled",
  Focused = "focused",
  Disabled = "disabled",
}

const InputWrapper = styled.div`
  ${textFont("md", "regular")}
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  ${textFont("sm", "regular")}
  color: ${color("gray", 700)}
`;

const InputIcon = styled.svg<{ iconSrc?: string }>`
  background: url(${(props) => props.iconSrc});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: ${color("gray", 500)};
  width: 20px;
  height: 20px;
`;
const InputContainer = styled.div<{
  state: InputStates;
  setError?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) => (props.setError ? color("error", 300) : color("gray", 300))};
  border-radius: 0.5rem;
  padding: 10px 14px;
  gap: 0.5rem;

  ${(props) => {
    switch (props.state) {
      case InputStates.Empty:
        return css`
          color: ${color("gray", 500)};
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
const CustomInput = styled.input`
  background-color: #fff;
  border: none;
  ${textFont("md", "regular")}
  cursor: text;
  outline: none;
`;

const InputHint = styled.div<{ setError?: boolean }>`
  display: block;
  color: ${(props) =>
    props.setError ? color("error", 300) : color("gray", 500)};
  ${textFont("sm", "regular")};
`;

export const Input: FC<InputProps> = ({
  name,
  label,
  hintText,
  type = "text",
  iconSrc,
  setError,
  ...rest
}) => {
  const [state, setState] = useState(InputStates.Empty);

  useEffect(() => {
    function handleOnChange() {
      if (rest.value) {
        setState(InputStates.Filled);
      } else {
        setState(InputStates.Empty);
      }
    }
    handleOnChange();
  }, [rest.value]);
  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputContainer state={state} setError={setError}>
        <InputIcon iconSrc={iconSrc} />
        <CustomInput
          id={name}
          type={type}
          onClick={() => setState(InputStates.Focused)}
          onBlur={(e) =>
            setState(
              e.target.value.length === 0
                ? InputStates.Empty
                : InputStates.Filled
            )
          }
          {...rest}
        />
      </InputContainer>
      {hintText && (
        <InputHint setError={setError}>
          {setError ? "This is an error message" : hintText}
        </InputHint>
      )}
    </InputWrapper>
  );
};
