import { useRouter } from "next/router";
import { IssueFilters } from "@api/issues.types";

const validateFilters = (issueFilters: Record<string, string>) => {
  const validFilters: Record<string, string> = {};
  for (const key in issueFilters) {
    if (issueFilters[key]) {
      validFilters[key] = issueFilters[key];
    }
  }
  return validFilters;
};

export const useFilters = () => {
  const router = useRouter();
  const filters = validateFilters({
    status: router.query.status as string,
    level: router.query.level as string,
    project: router.query.project as string,
  }) as IssueFilters;
  const handleFilters = (newFilters: IssueFilters) => {
    const query = validateFilters({ ...router.query, ...newFilters });

    router.push({ query });
  };
  return { filters, handleFilters };
};
