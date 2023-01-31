import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(page?: number, projectId?: string | undefined) {
  return [QUERY_KEY, page, projectId];
}

export function useGetIssues(
  page: number,
  limit: number,
  projectId?: string | undefined
) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, projectId),
    ({ signal }) => getIssues(page, limit, projectId, { signal }),
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
        ({ signal }) => getIssues(page + 1, limit, projectId, { signal })
      );
    }
  }, [query.data, page, limit, projectId, queryClient]);
  return query;
}
