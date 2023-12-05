import { gql } from "@apollo/client";
import { TaskType } from "../types/task.type";

type QueryFilter = {
  name?: string;
  assigneeId?: string;
};

export const GET_TASKS_QUERY = gql`
  query Tasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      createdAt
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
    }
  }
`;

export const CREATE_TASKS_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      createdAt
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

export const UPDATE_TASK_QUERY = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      createdAt
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
    }
  }
`;

export type GetTasksQueryResponseType = {
  tasks: Array<TaskType>;
};

export type CreateTaskMutationResponseType = {
  createTask: TaskType;
};
export type CreateTaskVariablesType = {
  input: {
    name: string;
    assigneeId:string,
    dueDate:string,
    pointEstimate:string;
    status:string
  };
}

export type UpdateTaskMutationResponseType = {
  updateTask: TaskType;
};

export type DeleteTaskMutationResponseType = {
  deleteTask: {
    id: string;
  };
};

