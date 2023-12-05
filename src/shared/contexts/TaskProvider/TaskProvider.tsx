"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { TaskContextType, TaskProviderProps } from "./TaskProvider.type";
import {
  CREATE_TASKS_MUTATION,
  CreateTaskMutationResponseType,
  DELETE_TASK_MUTATION,
  DeleteTaskMutationResponseType,
  GET_TASKS_QUERY,
  GetTasksQueryResponseType,
  UPDATE_TASK_QUERY,
  UpdateTaskMutationResponseType,
} from "@/shared/services/task.service";
import { TaskType } from "@/shared/types/task.type";

export const TaskContext = createContext({} as TaskContextType);

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (context === null)
    throw new Error("useTaskContext must be used within a TaskProvider");

  return context;
};

export const TaskProvider = ({ children, assigneeId }: TaskProviderProps) => {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  const [task, setTask] = useState<TaskType>();

  // Query
  const { loading } = useQuery<GetTasksQueryResponseType>(GET_TASKS_QUERY, {
    variables: {
      input: {
        name: searchFilter.length === 0 ? undefined : searchFilter,
        assigneeId,
      },
    },
    onCompleted({ tasks }) {
      setTasks(
        tasks.map((task) => {
          return { ...task, dueDate: task.dueDate.split("T")[0] };
        })
      );
    },
  });

  // MUTATIONS
  const [addTaskMutation, { loading: loadingAdd }] =
    useMutation<CreateTaskMutationResponseType>(CREATE_TASKS_MUTATION, {
      onCompleted({ createTask }) {
        const newTask = {
          ...createTask,
          dueDate: createTask.dueDate.split("T")[0] + "",
        };
        setTasks([...tasks, newTask]);
      },
    });

  const [updateTaskMutation, { loading: loadingEdit }] =
    useMutation<UpdateTaskMutationResponseType>(UPDATE_TASK_QUERY, {
      onCompleted({ updateTask }) {
        const newTask = {
          ...updateTask,
          dueDate: updateTask.dueDate.split("T")[0] + "",
        };
        setTasks(
          tasks.map((task) => {
            if (task.id === newTask.id) return newTask;
            return task;
          })
        );
      },
    });

  const [deleteTaskMutation, { loading: loadingDelete }] =
    useMutation<DeleteTaskMutationResponseType>(DELETE_TASK_MUTATION, {
      onCompleted({ deleteTask }) {
        setTasks(tasks.filter((task) => task.id !== deleteTask.id));
      },
    });

  // handlers
  const addTask = async (task: Omit<TaskType, "id" | "position">) => {
    await addTaskMutation({
      variables: {
        input: { ...task },
      },
    });
  };

  const editTask = async (
    task: Omit<TaskType, "id" | "position">,
    id: string
  ) => {
    await updateTaskMutation({
      variables: {
        input: { ...task, id },
      },
    });
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskMutation({
      variables: {
        input: { id: taskId },
      },
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        setTask,
        addTask,
        loading,
        loadingDelete,
        loadingEdit,
        loadingAdd,
        editTask,
        deleteTask,
        setSearchFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
