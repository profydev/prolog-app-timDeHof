import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(page?: number, projectId?: string | undefined) {
  if (page === undefined) {
    return [QUERY_KEY];
  } else if (projectId) {
    return [QUERY_KEY, page, projectId];
  }
  return [QUERY_KEY, page];
}

export function useGetIssues(page: number, projectId?: string | undefined) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, projectId),
    ({ signal }) => getIssues(page, projectId, { signal }),
    {
      keepPreviousData: true,
    }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(
        getQueryKey(page + 1, projectId),
        ({ signal }) => getIssues(page + 1, projectId, { signal })
      );
    }
  }, [query.data, page, projectId, queryClient]);
  return query;
}
