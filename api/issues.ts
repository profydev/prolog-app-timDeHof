import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  project?: string | undefined,
  options?: { signal?: AbortSignal }
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: project ? { page, project } : { page },
    signal: options?.signal,
  });

  return data;
}

export async function resolveIssue(issueId: string) {
  const { data } = await axios.patch(`${ENDPOINT}/${issueId}`, {
    status: "resolved",
  });
  return data;
}
