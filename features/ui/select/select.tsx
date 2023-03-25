import React, {
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  SelectHTMLAttributes,
  FormEventHandler,
} from "react";
import { useClickAway } from "react-use";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";
import { SelectContext } from "./select-context";

export type SelectProps = {
  children: ReactNode | ReactNode[];
  name?: string;
  error?: string;
  defaultValue?: string;
  placeholder: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
  hintText?: string;
  onChange?: FormEventHandler<HTMLDivElement> | undefined;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "children">;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  min-width: 160px;
`;

const SelectLabel = styled.p`
  position: absolute;
  bottom: 1rem;
  ${textFont("sm", "medium")}
  color: ${color("gray", 700)};
  margin: 0;
  margin-bottom: 0.25rem;
`;

const SelectHint = styled.p`
  position: relative;
  top: 46px;
  ${textFont("sm", "regular")};
  color: ${color("gray", 500)};
  letter-spacing: 0.05rem;
  margin: 0;
  margin-top: 0.25rem;
`;

const SelectError = styled.span`
  position: relative;
  top: 46px;
  ${textFont("sm", "regular")};
  color: ${color("gray", 500)};
  letter-spacing: 0.05rem;
  margin: 0;
  margin-top: 0.25rem;
`;

const CustomSelect = styled.div<{
  error: string;
  disabled: boolean;
  icon: string;
}>`
  ${textFont("md", "medium")}
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
      color: ${props.disabled && color("gray", 500)};
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

const Icon = styled.img<{
  showDropdown: boolean;
}>`
  transition: all 200ms;
  transform: ${({ showDropdown }) =>
    showDropdown ? "rotate(180deg)" : "none"};
`;

const OptionalIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  padding-inline: 0.25rem 0.25rem;
`;

const SelectList = styled.ul<{ showDropdown: boolean }>`
  display: block;
  width: 100%;
  margin: 3rem 0 0;
  padding: 0;
  position: absolute;
  background: white;
  box-shadow: 0 7px 12px -6px #d0d5dd;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  overflow: hidden;

  ${({ showDropdown }) =>
    showDropdown
      ? css`
          opacity: 1;
          visibility: visible;
          position: absolute;
          height: auto;
          z-index: 200;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}
`;
const titleCase = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const Select = ({
  placeholder = "",
  name,
  defaultValue = "",
  icon = "",
  disabled = false,
  label = "",
  hintText,
  error = "",
  children,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowDropdown(false);
  });

  const showDropdownHandler = useCallback(
    () => setShowDropdown((prevShowDropdown) => !prevShowDropdown),
    []
  );
  const updateSelectedOption = useCallback((option: string) => {
    option === "--" ? setSelectedOption("") : setSelectedOption(option);
    setShowDropdown(false);
  }, []);

  const value = useMemo(
    () => ({ selectedOption, changeSelectedOption: updateSelectedOption }),
    [selectedOption, updateSelectedOption]
  );
  return (
    <SelectContext.Provider value={value}>
      <SelectContainer data-testid={`${name}-test-select`} ref={ref}>
        {label && <SelectLabel>{label}</SelectLabel>}

        <CustomSelect
          onClick={showDropdownHandler}
          disabled={disabled}
          error={error}
          aria-expanded={showDropdown}
          icon={icon}
        >
          {icon && <OptionalIcon src={icon} />}

          {selectedOption ? titleCase(selectedOption) : placeholder}
          <Icon
            src={"/icons/chevron-down.svg"}
            alt="chevron-down"
            showDropdown={showDropdown}
          />
        </CustomSelect>

        {hintText && !showDropdown && !error && (
          <SelectHint>{hintText}</SelectHint>
        )}
        {error && !showDropdown && !disabled && (
          <SelectError>{error}</SelectError>
        )}
        <SelectList showDropdown={showDropdown} role="listbox" tabIndex={-1}>
          {children}
        </SelectList>
      </SelectContainer>
    </SelectContext.Provider>
  );
};
