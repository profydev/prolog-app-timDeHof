export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export enum IssueStatus {
  Unresolved = "open",
  Resolved = "resolved",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level: IssueLevel;
  numEvents: number;
  numUsers: number;
};

export type IssueFilters = {
  level?: IssueLevel | undefined;
  status?: IssueStatus | undefined;
  project?: string;
};
