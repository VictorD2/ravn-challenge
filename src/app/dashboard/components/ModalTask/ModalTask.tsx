"use client";
/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { FC, useState } from "react";
import { getRandomAvatar, wordsToNum } from "@/shared/utils/helpers";
import { ButtonProps } from "@/ui/Button/Button.type";
import { TaskType } from "@/shared/types/task.type";
import Container from "@/ui/Container";
import InputText from "@/ui/InputText";
import Button from "@/ui/Button";
import DropdownMenu from "@/ui/DropdownMenu";
import Item from "@/ui/DropdownMenu/Item";
import Text from "@/ui/Text";
import InputDate from "@/ui/InputDate";
import CheckBox from "@/ui/CheckBox";
import { UserType } from "@/shared/types/user.type";
import { ModalTaskProps } from "./ModalTask.type";
import {
  GET_USERS_QUERY,
  GetUsersQueryResponseType,
} from "@/shared/services/user.service";
import { estimatedPoints, stateOptions, tagsOptions } from "./options";
import { TaskSchemaResolver } from "./ModalTask.yup";

const ModalTask: FC<ModalTaskProps> = (props) => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  type TaskFormType = Omit<TaskType, "position">;

  useQuery<GetUsersQueryResponseType>(GET_USERS_QUERY, {
    onCompleted({ users }) {
      setUsers(users);
    },
  });

  const {
    defaultValues = {
      name: "",
      id: "",
      dueDate: "",
      pointEstimate: "",
      position: 0,
      status: "",
      assigneeId: "",
      tags: [],
      assignee: {
        avatar: "",
        createdAt: "",
        email: "",
        fullName: "",
        id: "",
        type: "",
        updatedAt: "",
      },
    },
    onCancel,
    onCreate,
    isLoading = false,
  } = props;

  const { watch, handleSubmit, setValue } = useForm<TaskFormType>({
    resolver: TaskSchemaResolver,
    defaultValues: {
      id: defaultValues.id,
      name: defaultValues.name,
      pointEstimate: defaultValues.pointEstimate,
      dueDate: defaultValues.dueDate,
      tags: defaultValues.tags,
      status: defaultValues.status,
      assignee: defaultValues.assignee,
      assigneeId: defaultValues.assignee?.id,
    },
  });

  const handleChangeValueForm = (field: keyof TaskFormType, value: string) => {
    return () => {
      setValue(field, value);
    };
  };

  const estimateOptionsButton: Array<ButtonProps> = estimatedPoints.map(
    (item) => {
      return {
        text: item.label,
        font: { color: "text-white" },
        size: { width: "" },
        bgColor: "bg-primary",
        border: {
          size: "border-none",
        },
        remixicon: "ri-remote-control-2-fill",
        onClick: handleChangeValueForm("pointEstimate", item.value),
      };
    }
  );

  const stateOptionsButton: Array<ButtonProps> = stateOptions.map((item) => {
    return {
      text: item.label,
      font: { color: "text-white" },
      size: { width: "" },
      bgColor: "bg-primary",
      border: {
        size: "border-none",
      },
      remixicon: "ri-layout-grid-line",
      onClick: handleChangeValueForm("status", item.value),
    };
  });

  const handleAssigneeTo = (user: UserType) => {
    return () => {
      setValue("assignee.fullName", user.fullName);
      setValue("assignee.avatar", user.avatar);
      setValue("assigneeId", user.id);
    };
  };

  const assigneeOptions: Array<ButtonProps> = users.map((user) => {
    return {
      text: user.fullName,
      font: { color: "text-white", whiteSpace: "truncate" },
      size: { width: "w-full" },
      bgColor: "bg-primary",
      border: {
        size: "border-none",
      },
      onClick: handleAssigneeTo(user),
      separator: { padding: "py-8 px-4" },
      children: (
        <img
          className="w-10 h-10 rounded-full"
          src={getRandomAvatar()}
          alt=""
        />
      ),
    };
  });

  const handleChangeCheckBox = (tag: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (watch("tags").includes(tag)) {
        setValue(
          "tags",
          watch("tags").filter((item) => item !== tag)
        );
        return;
      }
      setValue("tags", [...watch("tags"), tag]);
    };
  };

  const handleSubmitTask = () => {
    handleSubmit(() => {
      onCreate(watch());
    })();
  };

  return (
    <Container
      display="flex"
      flexDirection="flex-col"
      flexWrap="flex-nowrap"
      gap="gap-4"
      bgColor="bg-primary"
      separator={{ padding: "p-4" }}
    >
      <InputText
        bgColor="bg-transparent"
        border={{ size: "border-none" }}
        value={watch("name")}
        font={{ color: "text-white", size: "text-xl" }}
        placeholder="Task Title"
        onChange={(e) => setValue("name", e.target.value)}
      />
      <Container
        display="flex"
        flexWrap="flex-wrap"
        justify="justify-start"
        gap="gap-2"
      >
        {/* Estimated Points */}
        <DropdownMenu
          size={{ width: "" }}
          rounded="rounded-xl"
          positionAbs="top-12"
          border={{ size: "border-[1px]", color: "border-gray-500" }}
          bgColor="bg-primary"
          buttonNode={
            <Button
              text={
                watch("pointEstimate").length === 0
                  ? "Estimate"
                  : `${wordsToNum(watch("pointEstimate"))} Points`
              }
              remixicon="ri-remote-control-2-fill"
              bgColor="bg-zinc-700"
              font={{
                color: "text-white",
                size: "text-md",
                whiteSpace: "whitespace-nowrap",
              }}
            />
          }
        >
          <Text
            text="Estimate"
            font={{
              color: "text-gray-500",
              size: "text-xl",
              weight: "font-bold",
            }}
            separator={{ padding: "p-2" }}
          />
          {estimateOptionsButton.map((item, i) => {
            return (
              <Item
                {...item}
                key={"item-menu-options-estimate-" + i}
                gap="gap-2"
              />
            );
          })}
        </DropdownMenu>

        {/* Assing to */}
        <DropdownMenu
          size={{ width: "" }}
          rounded="rounded-xl"
          positionAbs="top-12"
          border={{ size: "border-[1px]", color: "border-gray-500" }}
          bgColor="bg-primary"
          buttonNode={
            <Button
              size={{ width: "w-full" }}
              text={
                watch("assigneeId").length !== 0
                  ? watch("assignee.fullName")
                  : "Assignee"
              }
              remixicon={watch("assigneeId").length !== 0 ? "" : "ri-user-fill"}
              bgColor="bg-zinc-700"
              font={{
                color: "text-white",
                size: "text-md",
                whiteSpace: "whitespace-nowrap truncate",
              }}
            >
              {watch("assigneeId").length !== 0 && (
                <img
                  className="w-5 h-5 rounded-full"
                  src={getRandomAvatar()}
                  alt=""
                />
              )}
            </Button>
          }
        >
          <Text
            text="Assign To..."
            font={{
              color: "text-gray-500",
              size: "text-xl",
              weight: "font-bold",
            }}
            separator={{ padding: "py-2 px-4" }}
          />
          {assigneeOptions.map((item, i) => {
            return (
              <Item
                {...item}
                key={"item-menu-options-estimate-" + i}
                gap="gap-2"
              />
            );
          })}
        </DropdownMenu>

        {/* Label */}
        <DropdownMenu
          size={{ width: "" }}
          rounded="rounded-xl"
          positionAbs="top-12"
          border={{ size: "border-[1px]", color: "border-gray-500" }}
          bgColor="bg-primary"
          buttonNode={
            <Button
              text={watch("tags").length > 0 ? watch("tags")[0] : "Label"}
              remixicon="ri-price-tag-3-fill"
              bgColor="bg-zinc-700"
              font={{
                textTransform: "capitalize",
                color: "text-white",
                size: "text-md",
                whiteSpace: "whitespace-nowrap",
              }}
            />
          }
        >
          <Text
            text="Tag Title"
            font={{
              color: "text-gray-500",
              size: "text-xl",
              weight: "font-bold",
              whiteSpace: "whitespace-nowrap",
            }}
            separator={{ padding: "p-2" }}
          />
          <Container
            display="flex"
            flexDirection="flex-col"
            gap="gap-2"
            flexWrap="flex-nowrap"
            separator={{ padding: "px-2" }}
          >
            {tagsOptions.map((item, i) => {
              return (
                <CheckBox
                  checked={watch("tags").includes(item.value)}
                  text={item.label}
                  className="gap-2"
                  onChange={handleChangeCheckBox(item.value)}
                  key={"item-menu-options-tags-" + i}
                />
              );
            })}
          </Container>
        </DropdownMenu>

        {/* Due Date */}
        <InputDate
          size={{ width: "" }}
          getDate={(date) => {
            setValue("dueDate", moment(date).format("YYYY-MM-DD"));
          }}
          font={{ color: "text-white" }}
          buttonNode={
            <Button
              text={
                watch("dueDate").length !== 0
                  ? moment(watch("dueDate")).format("MMM. D YYYY")
                  : "Due Date"
              }
              remixicon="ri-calendar-check-line"
              bgColor="bg-zinc-700"
              font={{
                color: "text-white",
                size: "text-md",
                whiteSpace: "whitespace-nowrap",
              }}
            />
          }
          value={watch("dueDate")}
        />

        {/* Status */}
        <DropdownMenu
          size={{ width: "" }}
          rounded="rounded-xl"
          positionAbs="top-12"
          border={{ size: "border-[1px]", color: "border-gray-500" }}
          bgColor="bg-primary"
          buttonNode={
            <Button
              text={
                watch("status").length === 0 ? "Status" : `${watch("status")}`
              }
              remixicon="ri-layout-grid-line"
              bgColor="bg-zinc-700"
              font={{
                color: "text-white",
                size: "text-md",
                whiteSpace: "whitespace-nowrap",
              }}
            />
          }
        >
          <Text
            text="Status"
            font={{
              color: "text-gray-500",
              size: "text-xl",
              weight: "font-bold",
            }}
            separator={{ padding: "p-2" }}
          />
          {stateOptionsButton.map((item, i) => {
            return (
              <Item
                {...item}
                key={"item-menu-options-status-" + i}
                gap="gap-2"
              />
            );
          })}
        </DropdownMenu>
      </Container>
      <Container
        display="flex"
        flexWrap="flex-nowrap"
        justify="justify-end"
        gap="gap-2"
      >
        <Button
          onClick={onCancel}
          size={{ width: "" }}
          text="Cancel"
          disabled={isLoading}
          font={{ color: "text-white" }}
        />
        <Button
          onClick={handleSubmitTask}
          disabled={isLoading}
          loading={isLoading}
          animateLoading="animate-pulse"
          textLoading={watch("id")?.length === 0 ? "Adding..." : "Updating..."}
          size={{ width: "" }}
          text={watch("id")?.length === 0 ? "Add" : "Update"}
          bgColor="bg-secondary"
          font={{ color: "text-white" }}
        />
      </Container>
    </Container>
  );
};

export default ModalTask;
