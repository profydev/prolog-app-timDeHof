import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  limit: number,
  projectId?: string | undefined,
  options?: { signal?: AbortSignal }
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: projectId !== null ? { page, projectId, limit } : { page, limit },
    signal: options?.signal,
  });
  if (projectId === undefined) {
    return data;
  } else {
    data.items = data.items.filter((item) => item.projectId === projectId);
  }
  return data;
}

export async function resolveIssue(issueId: string) {
  const { data } = await axios.patch(`${ENDPOINT}/${issueId}`, {
    status: "resolved",
  });
  return data;
}
