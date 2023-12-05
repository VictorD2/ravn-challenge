import { TaskType } from "@/shared/types/task.type";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type TaskProviderProps = {
  children: ReactNode;
  assigneeId?: string;
};

export type TaskContextType = {
  tasks: Array<TaskType>;
  task?: TaskType;
  setTask: Dispatch<SetStateAction<TaskType | undefined>>;
  loading: boolean;
  loadingAdd: boolean;
  loadingEdit: boolean;
  loadingDelete: boolean;
  setSearchFilter: Dispatch<SetStateAction<string>>;
  editTask: (
    task: Omit<TaskType, "id" | "position">,
    id: string
  ) => Promise<void>;
  addTask: (task: Omit<TaskType, "id" | "position">) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
};
