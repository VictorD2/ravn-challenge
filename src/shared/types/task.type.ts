import { UserType } from "./user.type";

export type StatusTagType =
  | "BACKLOG"
  | "TODO"
  | "IN_PROGRESS"
  | "CANCELLED"
  | "DONE"
  | string;

export type TagType = {
  id: number;
  name: string;
  color: string;
};

export type TaskType = {
  id?: string;
  name: string;
  dueDate: string;
  pointEstimate: string;
  position: number;
  status: StatusTagType;
  tags: Array<string | undefined>;
  assignee?: UserType;
  assigneeId: string;
};
