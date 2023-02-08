import React, { useState, useRef, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";

export type SelectProps = {
  id: string;
  name: string;
  value?: string;
  label?: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  hintText?: string;
  error?: string;
  icon?: string;
  onChange?: (event: string) => void;
};

const SelectGroupContainer = styled.div``;
const SelectContainer = styled.div`
  position: relative;
  min-width: 160px;

  @media (hover: hover) {
    & > select:focus + div {
      display: none;
    }
  }
  & * {
    box-sizing: border-box;
  }
`;
const SelectLabel = styled.label`
  ${textFont("sm", "medium")}
  color: ${color("gray", 700)};
  display: block;
  margin-bottom: 6px;
`;

const NativeSelect = styled.select<{
  error: string;
}>`
  // remove default styles
  appearance: none;
  display: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: 1.5;
  outline: none;

  width: 100%;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  display: grid;

  :disabled {
    color: $color("gray", 500);
    background-color: ${color("gray", 50)};
  }

  :invalid {
    color: ${color("gray", 500)};
  }

  ${(props) =>
    css`
      border: 1px solid
        ${props.error ? color("error", 300) : color("gray", 300)};
    `}

  :focus {
    ${(props) =>
      css`
        border-color: 1px solid
          ${props.error ? color("error", 300) : color("gray", 300)};
        outline: 4px solid
          ${props.error ? color("error", 100) : color("primary", 100)};
      `}
  }
`;

const SelectOption = styled.option`
  z-index: 99;
`;

const SelectHint = styled.span`
  ${textFont("sm", "regular")};
  color: ${color("gray", 500)};
  display: block;
  margin-top: 6px;
`;

const SelectError = styled.span`
  ${textFont("sm", "regular")};
  color: ${color("error", 500)};
  display: block;
  margin-top: 6px;
`;

const CustomSelect = styled.div<{
  error: string;
  disabled: boolean;
  icon: string;
}>`
  ${textFont("md", "medium")}
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  display: none;

  width: 100%;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  display: flex;
  justify-content: space-between;
  ${(props) => {
    if (props.icon)
      return css`
        background: url(${props.icon}) no-repeat left 17.3px center #fff;
      `;
  }}
  ${(props) =>
    css`
      color: ${props.disabled ? color("gray", 500) : color("gray", 900)};
      background-color: ${props.disabled ? color("gray", 50) : "white"};
    `};
  ${(props) =>
    css`
      border: 1px solid
        ${props.error ? color("error", 300) : color("gray", 300)};
    `};
  @media (hover: none) {
    *:hover {
      display: block;
    }
  }
`;
const CustomSelectOptionContainer = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  margin-top: 8px;
  ${textFont("sm", "medium")}
  color: ${color("gray", 900)};
  padding: 4px 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
`;
const CustomSelectOption = styled.div`
  padding: 10px 14px;
  background-color: #fff;
  :hover {
    background-color: ${color("primary", 25)};
  }
`;

const CustomSelectedOption = styled.div`
  padding: 10px 14px;
  background: url("/icons/check.svg") ${color("primary", 25)} no-repeat right
    17px center;
`;

const Placeholder = styled.div`
  color: ${color("gray", 500)};
`;
const titleCase = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Icon = styled.img`
  transition: all 200ms;
  transform: rotate(var(--chevronDirection, 0deg));
`;
export const Select = ({
  id,
  name,
  value = "",
  label = "",
  placeholder = "",
  disabled = false,
  options,
  hintText,
  error = "",
  icon = "",
  onChange,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const customSelectRef = useRef<HTMLDivElement>(null);
  const customOptionsRef = useRef<HTMLDivElement>(null);

  const clickHandler = useCallback(() => {
    if (customOptionsRef.current && customSelectRef.current && !disabled) {
      if (customOptionsRef.current.style.display === "block") {
        customOptionsRef.current.style.display = "none";
        customSelectRef.current.style.outline = "none";
        customSelectRef.current.parentElement?.style.setProperty(
          "--chevronDirection",
          "0deg"
        );
      } else {
        customOptionsRef.current.style.display = "block";
        customSelectRef.current.style.outline = error
          ? "4px solid #FEE4E2"
          : "4px solid #F4EBFF";
        customSelectRef.current.parentElement?.style.setProperty(
          "--chevronDirection",
          "180deg"
        );
      }
    }
  }, [customOptionsRef, customSelectRef, disabled, error]);

  useEffect(() => {
    customSelectRef.current?.addEventListener("click", clickHandler);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      customSelectRef.current?.removeEventListener("click", clickHandler);
    };
  }, [customSelectRef, customOptionsRef, clickHandler]);

  useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (!customOptionsRef.current || !customSelectRef.current || disabled)
        return;
      if (!(e.target instanceof Node)) return;
      if (
        customOptionsRef.current.contains(e.target) ||
        customSelectRef.current.contains(e.target)
      )
        return;

      if (customOptionsRef.current.style.display === "block") {
        customOptionsRef.current.style.display = "none";
        customSelectRef.current.style.outline = "none";
        customSelectRef.current.parentElement?.style.setProperty(
          "--chevronDirection",
          "0deg"
        );
      }
    };

    document.addEventListener("mousedown", closeOpenMenus);
    return () => document.removeEventListener("mousedown", closeOpenMenus);
  }, [disabled]);

  useEffect(() => {
    if (selectedOption == "--") {
      setSelectedOption("");
    }
  }, [selectedOption]);
  return (
    <SelectGroupContainer>
      {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
      <SelectContainer>
        <NativeSelect
          required
          id={id}
          name={name}
          disabled={disabled}
          error={error}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
        >
          {placeholder && !selectedOption && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const lowerCasedOption = option.toLocaleLowerCase();
            return (
              <SelectOption
                value={lowerCasedOption}
                key={lowerCasedOption}
                selected={option === selectedOption}
              >
                {titleCase(lowerCasedOption)}
              </SelectOption>
            );
          })}
        </NativeSelect>
        <CustomSelect
          ref={customSelectRef}
          error={error}
          disabled={disabled}
          aria-hidden={true}
          icon={icon}
          data-cy-id={`${id}-test-select`}
        >
          {selectedOption ? (
            titleCase(selectedOption)
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
          <Icon src={"/icons/chevron-down.svg"} alt="chevron-down" />
        </CustomSelect>
        <CustomSelectOptionContainer
          ref={customOptionsRef}
          data-cy-id={`${id}-test-option`}
        >
          {options.map((option) => {
            const lowerCasedOption = option.toLowerCase();
            if (lowerCasedOption === selectedOption.toLowerCase()) {
              return (
                <CustomSelectedOption key={lowerCasedOption}>
                  {titleCase(lowerCasedOption)}
                </CustomSelectedOption>
              );
            }
            return (
              <CustomSelectOption
                key={lowerCasedOption}
                onClick={() => {
                  setSelectedOption(option);
                  const nativeSelectElement = document?.querySelector(
                    `#${id}`
                  ) as HTMLSelectElement;
                  nativeSelectElement.value = option;
                  if (onChange) onChange(option);
                  clickHandler();
                }}
              >
                {titleCase(lowerCasedOption)}
              </CustomSelectOption>
            );
          })}
        </CustomSelectOptionContainer>
      </SelectContainer>
      {error ? (
        <SelectError>{error}</SelectError>
      ) : hintText ? (
        <SelectHint>{hintText}</SelectHint>
      ) : (
        ""
      )}
    </SelectGroupContainer>
  );
};
