import React, { useState } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export type InputProps = {
  id: string;
  name: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  iconSrc?: string;
  hintText?: string;
  setError?: boolean;
  errorMsg?: string;
  inputValue?: string;
  onChange?: (value: string) => void;
};

const InputContainer = styled.div`
  min-width: 280px;
  & * {
    box-sizing: border-box;
  }
`;

const Label = styled.label`
  display: block;
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")};
  margin-bottom: 6px;
`;

const CustomInput = styled.input<{
  iconSrc?: string;
  setError?: boolean;
  errorMsg: string;
}>`
  width: 100%;
  ${textFont("md", "medium")}
  border-radius: 0.5rem;
  padding: 10px 14px;
  color: ${color("gray", 900)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  ${(props) =>
    css`
      padding-left: ${props.iconSrc ? "2.625rem" : "0.875rem"};
      padding-right: ${props.setError ? "2.375rem" : "0.875rem"};
      background: ${
        props.iconSrc
          ? `url(${props.iconSrc}) left 15.7px center no-repeat`
          : props.setError
          ? "url(/icons/error.svg) right 15.3px center no-repeat"
          : "#FFF"
      };
      border: 1px solid
        ${props.setError ? color("error", 300) : color("gray", 300)};
      :focus {
          outline: 4px solid
            ${props.setError ? color("error", 300) : color("primary", 300)};
    `}
  :disabled {
    background-color: ${color("gray", 50)};
    color: ${color("gray", 500)};
  }
`;

const InputHint = styled.div<{ setError?: boolean }>`
  display: block;
  margin-top: 6px;
  color: ${(props) =>
    props.setError ? color("error", 300) : color("gray", 500)};
  ${textFont("sm", "regular")};
`;

export const Input = ({
  id,
  name,
  label = "",
  hintText = "",
  placeholder = "Project Name",
  iconSrc,
  disabled = false,
  setError = false,
  errorMsg = "",
  inputValue = "",
  onChange,
}: InputProps) => {
  const [value, setValue] = useState(inputValue);

  return (
    <InputContainer>
      {label && <Label htmlFor={name}>{label}</Label>}
      <CustomInput
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        setError={setError}
        errorMsg={errorMsg}
        iconSrc={iconSrc}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
      />
      {hintText && (
        <InputHint setError={setError}>
          {setError ? errorMsg : hintText}
        </InputHint>
      )}
    </InputContainer>
  );
};
