import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export type SelectProps = {
  options: string[];
  selectedOption: string;
  onChange?: (selectedOption: string) => void;
  label: string;
  defaultValue: string;
  state: SelectionStates;
  hintText?: string;
  hasIcon?: boolean;
};

export enum SelectionStates {
  Open = "open",
  Empty = "empty",
  Filled = "filled",
  Focused = "focused",
  Disabled = "disabled",
}

const SelectContainer = styled.div`
  position: relative;
  max-height: 400px;
  ${textFont("md", "regular")}
`;

const SelectLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  ${textFont("sm", "regular")}
  color: ${color("gray", 700)}
`;

const SelectHint = styled.div<{ state: SelectionStates }>`
  display: ${(props) =>
    props.state === SelectionStates.Open ? "none" : "block"};
  top: 100%;
  left: 0;
  right: 0;
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")}
  order: 2;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Selected = styled.div<{ state: SelectionStates }>`
  position: relative;
  background-color: #fff;
  border: 1px solid ${color("gray", 300)};
  border-radius: 8px;
  min-width: 320px;
  padding: 10px 140px 10px 14px;
  margin-bottom: 8px;
  order: 0;

  &:after {
    content: "";
    background: url("./icons/chevron-down.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    color: ${color("gray", 500)};

    position: absolute;
    height: 100%;
    width: 10px;
    right: 5%;
    top: 2.5%;

    transition: all 0.4s;
  }
  ${(props) => {
    switch (props.state) {
      case SelectionStates.Empty:
        return css`
          color: ${color("gray", 500)};
          ${textFont("md", "regular")}
        `;
      case SelectionStates.Filled:
        return css`
          color: ${color("gray", 900)};
        `;
      case SelectionStates.Focused:
        return css`
          border: 1px solid ${color("primary", 300)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px #f4ebff;
        `;
      case SelectionStates.Open:
        return css`
          border: 1px solid ${color("primary", 300)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px #f4ebff;

          &:after {
            transform: rotate(180deg);
          }
        `;
      case SelectionStates.Disabled:
        return css`
          pointer-events: none;
          cursor: not-allowed;
          background-color: ${color("gray", 50)};
          color: ${color("gray", 300)};
        `;
    }
  }}
`;

const OptionsContainer = styled.div<{ state: SelectionStates }>`
  max-height: ${(props) =>
    props.state === SelectionStates.Open ? "320px" : "0px"};
  order: 1;
  opacity: ${(props) => (props.state === SelectionStates.Open ? "1" : "0")};
  width: 100%;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
`;

const Option = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  display: flex;
  &:hover {
    background-color: ${color("primary", 200)};
  }
`;

const Icon = styled.div`
  width: 13px;
  color: ${color("gray", 500)};
  background: url("./icons/user.svg");
  margin-right: 11px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const OptionRadio = styled.input.attrs({ type: "radio" })`
  display: none;
  position: relative;
`;

const OptionLabel = styled.label``;

export const Select: FC<SelectProps> = ({
  options,
  state,
  label,
  hasIcon,
  hintText,
  selectedOption,
  onChange,
}) => {
  const [selectionState, setSelectionState] = useState(state);
  const [selected, setSelected] = useState(selectedOption);

  const openOptions = () => {
    setSelectionState(SelectionStates.Open);
  };

  const selectOption = (option: string) => {
    setSelected(option);
    setSelectionState(SelectionStates.Focused);
    if (onChange) {
      onChange(option);
    }
  };
  return (
    <SelectContainer>
      <SelectLabel>{label}</SelectLabel>
      <SelectBox>
        <OptionsContainer state={selectionState}>
          {options.map((option) => (
            <Option key={option}>
              {hasIcon && <Icon />}
              <OptionRadio
                id={option}
                name="option"
                onClick={() => selectOption(option)}
                value={option}
              />
              <OptionLabel htmlFor={option}>{option}</OptionLabel>
            </Option>
          ))}
        </OptionsContainer>
        <Selected state={selectionState} onClick={openOptions} tabIndex={0}>
          {selected}
        </Selected>
        {hintText && <SelectHint state={selectionState}>{hintText}</SelectHint>}
      </SelectBox>
    </SelectContainer>
  );
};
