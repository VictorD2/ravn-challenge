import { TaskType } from "@/shared/types/task.type";

export type ModalTaskProps = {
  defaultValues?: Partial<TaskType>;
  onCreate: (task: Omit<TaskType, "position">) => void;
  onCancel: () => void;
  isLoading?: boolean;
};
