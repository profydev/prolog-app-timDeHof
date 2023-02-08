import { useRouter } from "next/router";
import styled from "styled-components";
import { color, space, textFont, breakpoint } from "@styles/theme";
import { ProjectLanguage } from "@api/projects.types";
import { Select, Input, Spinner } from "@features/ui";
import { useProjects } from "@features/projects";
import { useGetIssues } from "../../api";
import { IssueRow } from "./issue-row";
import { Select } from "@features/ui/select";
import { Input } from "@features/ui/input";
import { StatusEnum, LevelEnum } from "@typings/issue.types";

const Container = styled.div`
  background: white;
  border: 1px solid ${color("gray", 200)};
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: ${space(2)};
  overflow: hidden;
`;

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid ${color("gray", 200)};
`;

const HeaderCell = styled.th`
  padding: ${space(3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("xs", "medium")};
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};
`;

const PaginationButton = styled.button`
  height: 38px;
  padding: ${space(0, 4)};
  background: white;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;

  &:not(:first-of-type) {
    margin-left: ${space(3)};
  }
`;

const PageInfo = styled.div`
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")}
`;

const PageNumber = styled.span`
  ${textFont("sm", "medium")}
`;

function getParsedInfo(
  value: string | undefined,
  enumToMatch: object
): string | undefined {
  if (value === undefined) return undefined;
  const enumKeys = Object.keys(enumToMatch);
  if (enumKeys.includes(value))
    return enumToMatch[value as keyof typeof enumToMatch];
  return undefined;
}
export const tableLabels = ["Issue", "Level", "Events", "Users"];

export function IssueList() {
  const router = useRouter();

  let project = router.query.project as string;
  if (project) project = project.toLowerCase();
  const page = Number(router.query.page || 1);

  const level = getParsedInfo(
    router.query.level as string | undefined,
    LevelEnum
  );
  const status = getParsedInfo(
    router.query.status as string | undefined,
    StatusEnum
  );
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage, ...router.query },
    });

  const issuesPage = useGetIssues(page, project, level, status);

  const projects = useProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <Spinner />;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>
  );
  const { items, meta } = issuesPage.data || {};

  const fieldChangeHandler = (name: string) => (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [name]: value },
    });
  };
  return (
    <>
      <FilterContainer>
        <Select
          id="level"
          name="level"
          placeholder="Level"
          options={["--", ...Object.keys(LevelEnum)]}
          onChange={fieldChangeHandler("level")}
          value={level}
        />
        <Select
          id="status"
          name="status"
          placeholder="Status"
          options={["--", ...Object.keys(StatusEnum)]}
          onChange={fieldChangeHandler("status")}
          value={status}
        />

        <Input
          id="project"
          iconSrc="/icons/search.svg"
          placeholder="Project Name"
          name="project"
          onChange={() => fieldChangeHandler("project")}
          inputValue={project}
        />
      </FilterContainer>
      <Container>
        <Table>
          <thead>
            <HeaderRow>
              <HeaderCell>Issue</HeaderCell>
              <HeaderCell>Level</HeaderCell>
              <HeaderCell>Events</HeaderCell>
              <HeaderCell>Users</HeaderCell>
            </HeaderRow>
          </thead>
          <tbody>
            {(items || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <div>
            <PaginationButton
              onClick={() => navigateToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </PaginationButton>
            <PaginationButton
              onClick={() => navigateToPage(page + 1)}
              disabled={page === meta?.totalPages}
              data-cy="next-button"
            >
              Next
            </PaginationButton>
          </div>

          <PageInfo data-cy="pageInfo">
            Page{" "}
            <PageNumber data-cy="currentPage">{meta?.currentPage}</PageNumber>{" "}
            of <PageNumber>{meta?.totalPages}</PageNumber>
          </PageInfo>
        </PaginationContainer>
      </Container>
    </>
  );
}
