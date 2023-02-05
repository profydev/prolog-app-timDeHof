import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  projectId?: string | undefined,
  options?: { signal?: AbortSignal }
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: projectId ? { page, projectId } : { page },
    signal: options?.signal,
  });
  // console.log(`URL: ${ENDPOINT}`);
  // console.log(`Params: ${JSON.stringify(projectId ? { page, projectId } : { page })}`);
  // console.log(`Response: ${JSON.stringify(data)}`);
  // console.log(`Error: ${JSON.stringify(Error)}`);
  // console.log(`projectId: ${projectId}`);

  if (projectId === undefined || projectId === "") {
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
