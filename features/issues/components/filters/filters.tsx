import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import styled from "styled-components";
import { capitalize } from "lodash";
import { Select, Input } from "@features/ui";
import { breakpoint } from "@styles/theme";
import { IssueFilters, IssueLevel, IssueStatus } from "@api/issues.types";
import { useFilters } from "@features/issues/hooks/use-filters";
import { Option } from "@features/ui/select/option";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 25px;
  @media (max-width: ${breakpoint("desktop")}) {
    & div {
      flex: 1;
    }
  }
`;
function getStatusDefaultValue(filters: IssueFilters) {
  if (!filters.status) {
    return "status";
  }
  if (filters.status === IssueStatus.Unresolved) {
    return "Unresolved";
  }
  return "Resolved";
}

function getLevelDefaultValue(filters: IssueFilters) {
  if (!filters.level) {
    return "Level";
  }
  return capitalize(filters.level);
}

export const Filters = () => {
  const { handleFilters, filters } = useFilters();
  const debouncedHandleFilters = useDebouncedCallback(handleFilters, 300);
  const [inputValue, setInputValue] = useState(filters.project || "");

  const handleChange = (project: string) => {
    setInputValue(project);
    debouncedHandleFilters({ project: project.toLowerCase() });
  };
  const handleLevel = (level: string | undefined) => {
    if (level === "--") {
      level = "";
    }
    if (level) {
      level = level.toLowerCase();
    }
    handleFilters({ level: level as IssueLevel });
  };

  const handleStatus = (status: string | undefined) => {
    if (status === "unresolved") {
      status = "open";
    }
    if (status === "--") {
      status = "";
    }
    if (status) {
      status = status.toLowerCase();
    }
    handleFilters({ status: status as IssueStatus });
  };
  const statusOptions = ["--", ...Object.keys(IssueStatus || {})];
  const levelOptions = ["--", ...Object.keys(IssueLevel || {})];
  return (
    <FilterContainer>
      <Select
        name="status"
        placeholder="Status"
        defaultValue={getStatusDefaultValue(filters)}
      >
        {statusOptions.map((option) => {
          const lowerCasedOption = option.toLocaleLowerCase();

          return (
            <Option
              name="status"
              key={lowerCasedOption}
              value={lowerCasedOption}
              handleCallback={handleStatus}
              data-test-id="status-test-options"
            >
              {lowerCasedOption}
            </Option>
          );
        })}
      </Select>

      <Select
        name="level"
        placeholder="Level"
        defaultValue={getLevelDefaultValue(filters)}
      >
        {levelOptions.map((option) => {
          const lowerCasedOption = option.toLocaleLowerCase();

          return (
            <Option
              name="level"
              key={lowerCasedOption}
              value={lowerCasedOption}
              handleCallback={handleLevel}
              data-cy="level-test-option"
            >
              {lowerCasedOption}
            </Option>
          );
        })}
      </Select>

      <Input
        id="project"
        iconSrc="/icons/search.svg"
        placeholder="Project Name"
        name="project"
        onChange={handleChange}
        inputValue={inputValue}
      />
    </FilterContainer>
  );
};
