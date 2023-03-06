import { useRouter } from "next/router";
import { IssueFilters } from "@api/issues.types";

const removeEmptyStrings = (issueFilters: any) => {
  for (const key in issueFilters) {
    console.log("key in issueFilters: ", key);
    console.log("issueFilters[key]: ", issueFilters[key]);
    if (issueFilters[key] === "") {
      delete issueFilters[key];
    }
  }
  return issueFilters;
};

export const useFilters = () => {
  const router = useRouter();
  const filters = {
    status: router.query.status,
    level: router.query.level,
    project: router.query.project,
  } as IssueFilters;
  const handleFilters = (newFilters: IssueFilters) => {
    const query = removeEmptyStrings({ ...router.query, ...newFilters });
    router.push({ query });
  };
  return { filters, handleFilters };
};
