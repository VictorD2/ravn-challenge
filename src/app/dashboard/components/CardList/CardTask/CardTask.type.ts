import { ButtonProps } from "@/ui/Button/Button.type";
import { TaskType } from "@/shared/types/task.type";

export type CardTaskProps = {
  isListMode?: boolean;
  task: TaskType;
  options?: Array<ButtonProps>;
};
