"use client";
import { useState } from "react";
import { useTaskContext } from "@/shared/contexts/TaskProvider/TaskProvider";
import { StatusTagType, TaskType } from "@/shared/types/task.type";
import { ButtonProps } from "@/ui/Button/Button.type";
import Container from "@/ui/Container";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import Confirm from "@/ui/Confirm";
import CardList from "../dashboard/components/CardList";
import CardTask from "../dashboard/components/CardList/CardTask";
import ModalTask from "../dashboard/components/ModalTask";
import MonsterInput from "../dashboard/components/MonsterInput";
import CardListHeader from "../dashboard/components/CardList/CardListHeader";
import Loading from "@/shared/components/Loading";

const MyTasksPage = () => {
  const [isListMode, setIsListMode] = useState<boolean>(false); //List mode => true, card mode => false
  const [showModalTask, setShowModalTask] = useState<boolean>(false); //Show modal task
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    tasks,
    task,
    addTask,
    editTask,
    setTask,
    deleteTask,
    setSearchFilter,
    loading,
    loadingAdd,
    loadingDelete,
    loadingEdit,
  } = useTaskContext();

  // List mode or card mode
  const handleChangeMode = (value: boolean) => {
    return () => {
      setIsListMode(value);
    };
  };

  // Accept Create Modal Task Button
  const onSubmitTaskModal = async (task: Omit<TaskType, "position">) => {
    const { id, assignee, ...rest } = task;
    id?.length !== 0 ? await editTask(rest, id + "") : await addTask(rest);
    setShowModalTask(false);
  };

  // Cancel Create Modal Task Button
  const onCancelTaskModal = () => setShowModalTask(false);

  // Open or close Modal
  const handleChangeShowModal = (value: boolean) => {
    return () => {
      setShowModalTask(value);
    };
  };

  // Card Task Edit Event
  const handleEditTask = (task: TaskType) => {
    return () => {
      setTask(task);
      setShowModalTask(true);
    };
  };

  // Card Task Add Event
  const handleAddTask = () => {
    setTask(undefined);
    setShowModalTask(true);
  };

  // Card Task Delete Event
  const handleDeleteTask = (task: TaskType) => {
    return () => {
      setTask(task);
      setShowConfirm(true);
    };
  };

  const onConfirmDeleteTask = async () => {
    deleteTask(task?.id + "");
    setShowConfirm(false);
  };

  const optionsDropdownMenuTaks = (task: TaskType): Array<ButtonProps> => {
    return [
      {
        text: "Edit",
        font: { color: "text-white" },
        bgColor: "bg-primary",
        border: {
          size: "border-none",
        },
        remixicon: "ri-edit-line",
        onClick: handleEditTask(task),
      },

      {
        text: "Delete",
        font: { color: "text-white" },
        bgColor: "bg-primary",
        border: {
          size: "border-none",
        },
        remixicon: "ri-delete-bin-line",
        onClick: handleDeleteTask(task),
      },
    ];
  };

  const tasksStatus: Array<{ status: StatusTagType; name: string }> = [
    { status: "BACKLOG", name: "Backlog" },
    { status: "TODO", name: "To Do" },
    { status: "IN_PROGRESS", name: "In Progress" },
    { status: "DONE", name: "Done" },
    { status: "CANCELLED", name: "Cancelled" },
  ];

  const handleEnterInputSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter")
      setSearchFilter(e.currentTarget.value);
  };

  return (
    <Container
      display="flex"
      size={{ minHeight: "min-h-screen", width: "w-full" }}
      flexDirection="flex-col"
      align="items-center"
      separator={{ padding: "p-4" }}
    >
      <title>My Tasks</title>

      {/* Search Input */}
      <MonsterInput onKeyUp={handleEnterInputSearch} />

      {/* Actions */}
      <Container
        separator={{ margin: "mt-8" }}
        display="flex"
        flexDirection="flex-row"
        justify="justify-between"
        flexWrap="flex-nowrap"
        align="items-start"
        size={{ width: "w-full" }}
      >
        {/* Left side */}
        <Container
          display="flex"
          flexDirection="flex-row"
          flexWrap="flex-nowrap"
          gap="gap-1"
        >
          {/* List Mode Button*/}
          <Button
            onClick={handleChangeMode(true)}
            remixicon="ri-menu-fill"
            bgColor="bg-background"
            border={{
              color: "border-secondary",
              size: isListMode ? "border" : "",
            }}
            font={{
              color: isListMode ? "text-secondary" : "text-white",
              size: "text-2xl",
            }}
            separator={{ padding: "p-2" }}
          />

          {/* Card Mode Button*/}
          <Button
            onClick={handleChangeMode(false)}
            remixicon="ri-function-line"
            bgColor="bg-background"
            border={{
              color: "border-secondary",
              size: !isListMode ? "border" : "",
            }}
            font={{
              color: !isListMode ? "text-secondary" : "text-white",
              size: "text-2xl",
            }}
            separator={{ padding: "p-2" }}
          />
        </Container>

        {/* Right side */}
        <Container
          display="flex"
          flexDirection="flex-row"
          flexWrap="flex-nowrap"
          gap="gap-1"
        >
          {/* Add Button */}
          <Button
            onClick={handleAddTask}
            bgColor="bg-secondary"
            remixicon="ri-add-line"
            font={{ color: "text-white", size: "text-2xl" }}
            separator={{ padding: "p-2" }}
          />
        </Container>
      </Container>

      {/* List */}
      <Container size={{ width: "w-full" }}>
        <Container
          display="flex"
          flexDirection={isListMode ? "flex-col" : "flex-row"}
          className="overflow-x-auto"
          size={{ minWidth: "min-w-full" }}
          gap={isListMode ? "gap-2" : ""}
          separator={{ margin: isListMode ? "mt-2" : "mt-6" }}
        >
          {/* List Header */}
          {isListMode && <CardListHeader isListMode={isListMode} />}

          <Container
            display="flex"
            flexDirection={isListMode ? "flex-col" : "flex-row"}
            gap={isListMode ? "gap-2" : ""}
            size={{ width: "w-full" }}
            separator={{ margin: isListMode ? "mt-2" : "mt-6" }}
          >
            {/* Each Column */}
            {loading ? (
              <Container
                size={{ width: "w-full", minWidth: "min-w-[58.1875rem]" }}
              >
                <Loading />
              </Container>
            ) : (
              <>
                {tasksStatus.map((item) => {
                  return (
                    <CardList
                      key={item.name + item.status}
                      isListMode={isListMode}
                      name={item.name}
                      quantity={
                        tasks.filter((task) => task.status === item.status)
                          .length
                      }
                    >
                      {tasks
                        .filter((task) => task.status === item.status)
                        .map((task) => {
                          return (
                            <CardTask
                              isListMode={isListMode}
                              key={task.id + task.name}
                              task={task}
                              options={optionsDropdownMenuTaks(task)}
                            />
                          );
                        })}
                    </CardList>
                  );
                })}
              </>
            )}
          </Container>
        </Container>
      </Container>

      {/* Modal Task */}
      <Modal
        overlayBgColor="bg-primary"
        rounded="rounded-2xl"
        width="xl:w-4/12 lg:w-8/12 md:w-9/12 w-full"
        onClose={handleChangeShowModal(false)}
        open={showModalTask}
      >
        <ModalTask
          isLoading={loadingAdd || loadingEdit}
          defaultValues={task}
          onCreate={onSubmitTaskModal}
          onCancel={onCancelTaskModal}
        />
      </Modal>

      {/* Confirm Delete Task */}
      <Confirm
        loading={loadingDelete}
        type="danger"
        title="Delete Task"
        buttonText="Delete"
        message="Are you sure you want to delete this task?"
        onConfirm={onConfirmDeleteTask}
        open={showConfirm}
        setOpen={() => setShowConfirm(false)}
      />
    </Container>
  );
};

export default MyTasksPage;
