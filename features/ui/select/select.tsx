import React, { FC } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export type SelectProps = {
  options: string[];
  onChange: (value: string) => void;
  label: string;
  value: string;
  isFocused: boolean;
  isDisabled: boolean;
  isOpen: boolean;
  hintText?: string;
};

const SelectContainer = styled.div`
  display: inline-block;
  position: relative;
  ${textFont("md", "regular")}
`;

const Selectlabel = styled.label`
  display: block;
  margin-bottom: 8px;
  ${textFont("sm", "regular")}
  color: ${color("gray", 700)}
`;

const SelectStyled = styled.select<{
  isFocused: boolean;
  isDisabled: boolean;
  isOpen: boolean;
}>`
  appearance: none;
  width: 200px;
  height: 40px;
  padding: 10px;
  border: 1px solid ${color("gray", 300)};
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    border-color: ${color("primary", 300)};
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #f4ebff;
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  ${(props) =>
    props.isOpen &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const Option = styled.option`
  color: #333333;
  background: white;
  display: flex;
  padding: 0px 2px 1px;
`;

const OptionsContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-top: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${(props) =>
    !props.isOpen &&
    css`
      display: none;
    `}
`;

const SelectHint = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  color: #999999;
  font-size: 12px;
`;

export const Select: FC<SelectProps> = ({
  options,
  onChange,
  label,
  value,
  isFocused,
  isDisabled,
  isOpen,
  hintText,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <SelectContainer>
      <Selectlabel htmlFor={label}>{label}</Selectlabel>
      <SelectStyled
        onChange={handleChange}
        value={value}
        isFocused={isFocused}
        isDisabled={isDisabled}
        isOpen={isOpen}
      >
        <OptionsContainer isOpen={isOpen}>
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </OptionsContainer>
      </SelectStyled>
      {hintText && <SelectHint>{hintText}</SelectHint>}
    </SelectContainer>
  );
};
