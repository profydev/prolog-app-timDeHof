import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { Spinner } from "@features/ui";
import { useProjects } from "@features/projects";
import { useGetIssues } from "../../api";
import { IssueRow } from "./issue-row";
import { Filters } from "../filters/filters";
import { useFilters } from "@features/issues/hooks/use-filters";
import * as il from "./issue-list.styles";

export const tableLabels = ["Issue", "Level", "Events", "Users"];

export function IssueList() {
  const router = useRouter();
  const { filters } = useFilters();
  const page = Number(router.query.page || 1);

  const navigateToPage = (newPage: number) => {
    console.log("meta: ", issuesPage.data?.meta);
    if (issuesPage.data && newPage > issuesPage.data.meta.totalPages) {
      newPage = issuesPage.data.meta.totalPages;
    }
    router.push({
      pathname: router.pathname,
      query: { page: newPage, ...filters },
    });
  };

  const issuesPage = useGetIssues(page);
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

  return (
    <>
      <Filters />
      <il.Container>
        <il.Table>
          <thead>
            <il.HeaderRow>
              <il.HeaderCell>Issue</il.HeaderCell>
              <il.HeaderCell>Level</il.HeaderCell>
              <il.HeaderCell>Events</il.HeaderCell>
              <il.HeaderCell>Users</il.HeaderCell>
            </il.HeaderRow>
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
        </il.Table>
        <il.PaginationContainer>
          <div>
            <il.PaginationButton
              onClick={() => navigateToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </il.PaginationButton>
            <il.PaginationButton
              onClick={() => navigateToPage(page + 1)}
              disabled={page === meta?.totalPages}
              data-cy="next-button"
            >
              Next
            </il.PaginationButton>
          </div>

          <il.PageInfo data-cy="pageInfo">
            Page{" "}
            <il.PageNumber data-cy="currentPage">
              {meta?.currentPage}
            </il.PageNumber>{" "}
            of <il.PageNumber>{meta?.totalPages}</il.PageNumber>
          </il.PageInfo>
        </il.PaginationContainer>
      </il.Container>
    </>
  );
}
