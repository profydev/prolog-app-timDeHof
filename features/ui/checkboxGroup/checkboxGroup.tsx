import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Checkbox, CheckboxState, CheckboxSize } from "../checkbox/checkbox";
import { textFont } from "@styles/theme";

export type CheckboxGroupOptions = {
  label: string;
  value: string;
  children?: CheckboxGroupOptions[];
};

export type CheckboxGroupProps = {
  options: CheckboxGroupOptions[];
  selectedValues: string[];
  disabled: boolean;
  size: CheckboxSize;
  onChange: (selectedValues: string[]) => void;
};

const CheckboxGroupContainer = styled.div<{ size: CheckboxSize }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1.3rem;
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
const CheckboxIndent = styled.div<{ size: CheckboxSize }>`
  display: none;
  width: ${(props) => (props.size === CheckboxSize.sm ? "0.8rem" : "1rem")};
  height: ${(props) => (props.size === CheckboxSize.sm ? "0.8rem" : "1rem")};
`;
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues = [],
  size = CheckboxSize.md,
  disabled = false,
  onChange,
}) => {
  const [internalSelectedValues, setInternalSelectedValues] =
    useState(selectedValues);

  const renderOptions = (options: CheckboxGroupOptions[], depth = 0) => {
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {options.map((option) => {
          const isChecked = internalSelectedValues.includes(option.value);
          const isPartlyChecked =
            option.children &&
            option.children.some(
              (childOption) =>
                internalSelectedValues.includes(childOption.value) &&
                !option.children?.every((childOption) =>
                  internalSelectedValues.includes(childOption.value)
                )
            );

          return (
            <li key={option.value}>
              <CheckboxGroupContainer size={size} key={option.value}>
                {depth > 0 && <CheckboxIndent size={size} />}
                <Checkbox
                  size={size}
                  state={
                    isChecked
                      ? CheckboxState.Checked
                      : isPartlyChecked
                      ? CheckboxState.PartlyChecked
                      : CheckboxState.Unchecked
                  }
                  disabled={disabled}
                  text={option.label}
                  onChange={() => {
                    let newSelectedValue: string[];
                    if (isChecked) {
                      // if the option is already checked, we remove it from the selected values
                      newSelectedValue = internalSelectedValues.filter(
                        (selectedValues) => selectedValues !== option.value
                      );
                    } else {
                      // If the option is not checked, we add it to the selected values
                      newSelectedValue = [
                        ...internalSelectedValues,
                        option.value,
                      ];
                    }
                    setInternalSelectedValues(newSelectedValue);
                    onChange(newSelectedValue);
                  }}
                />
                {option.children && renderOptions(option.children, depth + 1)}
              </CheckboxGroupContainer>
            </li>
          );
        })}
      </ul>
    );
  };
  return <div>{renderOptions(options)}</div>;
};
export { CheckboxSize, CheckboxState };
