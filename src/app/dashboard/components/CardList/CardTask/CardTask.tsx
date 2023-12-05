"use client";
/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import { FC } from "react";
import { classNames, getRandomAvatar, wordsToNum } from "@/shared/utils/helpers";
import { CardTaskProps } from "./CardTask.type";
import DropdownMenu from "@/ui/DropdownMenu";
import Item from "@/ui/DropdownMenu/Item";
import Container from "@/ui/Container";
import Text from "@/ui/Text";
import Icon from "@/ui/Icon";

// tag color date
const DUEDATE_COLOR = {
  WARNING: {
    text: "text-yellow-600",
    beforeBg: "before:bg-yellow-600",
    bg: "bg-[#3F3C36]",
  },
  DANGER: {
    text: "text-secondary",
    beforeBg: "before:bg-secondary",
    bg: "bg-[#3D3335]",
  },
  OK: {
    text: "text-white",
    beforeBg: "before:bg-lime-600",
    bg: "bg-[#36393D]",
  },
};

const CardTask: FC<CardTaskProps> = (props) => {
  const {
    task: { name, dueDate, pointEstimate, id, tags, assignee },
    isListMode = true,
    options = [],
  } = props;

  const formatDate = (date: Date | string) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");

    const inputMoment = moment(date).startOf("day");
    if (inputMoment.isSame(today, "day")) return "Today";
    if (inputMoment.isSame(yesterday, "day")) return "Yesterday";
    return inputMoment.format("D MMMM, YYYY");
  };

  const getColour = (date: Date | string) => {
    const MILISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    const dueDate = moment(date);
    const todayDate = moment(moment(new Date()).format("YYYY-MM-DD"));
    const dueDateMill = dueDate.toDate().getTime();
    const todayDateMill = todayDate.toDate().getTime();

    if (todayDateMill - dueDateMill > 0) return DUEDATE_COLOR.DANGER;

    if (
      MILISECONDS_PER_DAY * 1 >= dueDateMill - todayDateMill &&
      todayDateMill - dueDateMill <= 0
    )
      return DUEDATE_COLOR.WARNING;

    return DUEDATE_COLOR.OK;
  };

  if (isListMode) {
    return (
      <Container
        display="grid grid-cols-7"
        className={classNames(
          "before:w-1",
          "before:h-[80%]",
          "before:absolute",
          "before:left-0",
          "before:top-[50%]",
          "before:translate-y-[-50%]",
          getColour(dueDate).beforeBg
        )}
        position="relative"
      >
        {/* Name */}
        <Container
          display="flex"
          align="items-center"
          separator={{ padding: "p-4" }}
          border={{ color: "border-gray-700", size: "border-[0.5px]" }}
          className="col-span-3"
        >
          <Text
            text={`${name}`}
            font={{
              color: "text-white",
              weight: "font-normal",
              size: "text-md",
              whiteSpace: "whitespace-nowrap",
            }}
          />
        </Container>

        {/* Task Tags */}
        <Container
          display="flex"
          flexDirection="flex-row"
          align="items-center"
          gap="gap-2"
          separator={{ padding: "p-4" }}
          border={{
            size: "border-[0.5px]",
            color: "border-gray-700",
          }}
          className={classNames("col-span-1", "overflow-x-auto")}
        >
          {tags.map((tag) => {
            return (
              <Container
                key={id + "" + tag}
                bgColor={DUEDATE_COLOR.OK.bg}
                separator={{ padding: "p-2" }}
              >
                <Text
                  text={tag}
                  font={{
                    textTransform: "uppercase",
                    color: "text-white",
                    weight: "font-bold",
                    whiteSpace: "whitespace-nowrap",
                  }}
                />
              </Container>
            );
          })}
        </Container>

        {/* Estimate */}
        <Container
          display="flex"
          align="items-center"
          separator={{ padding: "p-4" }}
          border={{ color: "border-gray-700", size: "border-[0.5px]" }}
          className="col-span-1"
        >
          <Text
            className="truncate"
            text={`${wordsToNum(pointEstimate + "")} Points`}
            font={{
              color: "text-white",
              weight: "font-normal",
              size: "text-sm",
            }}
          />
        </Container>

        {/* Assign to */}
        <Container
          display="flex"
          gap="gap-2"
          flexWrap="flex-nowrap"
          align="items-center"
          separator={{ padding: "p-4" }}
          border={{ color: "border-gray-700", size: "border-[0.5px]" }}
          className="col-span-1"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={getRandomAvatar()}
            alt="Photo profile"
          />
          <Text
            className="truncate"
            text={assignee?.fullName}
            font={{
              color: "text-white",
              weight: "font-normal",
              size: "text-md",
              whiteSpace: "whitespace-nowrap",
            }}
          />
        </Container>

        {/* Due Date */}
        <Container
          display="flex"
          align="items-center"
          separator={{ padding: "p-4" }}
          border={{ color: "border-gray-700", size: "border-[0.5px]" }}
          className="col-span-1"
        >
          <Text
            className="truncate"
            text={formatDate(dueDate)}
            font={{
              whiteSpace: "whitespace-nowrap",
              color: getColour(dueDate).text,
            }}
          />
        </Container>
      </Container>
    );
  }

  return (
    <Container
      bgColor="bg-primary"
      display="flex"
      flexDirection="flex-col"
      flexWrap="flex-nowrap"
      separator={{ padding: "p-4" }}
      gap="gap-4"
    >
      {/* Title and Options */}
      <Container
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        align="items-center"
        size={{ width: "w-full" }}
      >
        {/* Title */}
        <Text
          text={name}
          font={{
            color: "text-white",
            weight: "font-normal",
            size: "text-md",
          }}
        />
        {/* Options */}
        <DropdownMenu
          border={{ size: "border-[1px]", color: "border-gray-700" }}
          bgColor="bg-primary"
          buttonNode={
            <Icon
              remixicon="ri-more-line"
              className="cursor-pointer"
              font={{
                color: "text-gray-400",
                weight: "font-normal",
                size: "text-2xl",
              }}
            />
          }
        >
          {options.map((item, i) => {
            return (
              <Item {...item} key={"item-menu-options-" + i} gap="gap-2" />
            );
          })}
        </DropdownMenu>
      </Container>

      {/* Points and Due Date */}
      <Container
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        align="items-center"
      >
        {/* Points */}
        <Text
          text={`${wordsToNum(pointEstimate + "")} Points`}
          font={{
            color: "text-white",
            weight: "font-normal",
            size: "text-sm",
          }}
        />
        {/* Due Date */}
        <Container
          display="flex"
          flexDirection="flex-row"
          flexWrap="flex-nowrap"
          align="items-center"
          gap="gap-2"
          separator={{ padding: "px-3" }}
          bgColor={getColour(dueDate).bg}
        >
          <Icon
            remixicon="ri-time-line"
            font={{ color: getColour(dueDate).text, size: "text-lg" }}
          />
          <Text
            text={formatDate(dueDate)}
            font={{
              whiteSpace: "whitespace-nowrap",
              color: getColour(dueDate).text,
              textTransform: "uppercase",
            }}
          />
        </Container>
      </Container>

      {/* Tags */}
      <Container
        display="flex"
        flexDirection="flex-row"
        align="items-center"
        gap="gap-2"
      >
        {tags.map((tag) => {
          return (
            <Container
              key={id + "" + tag}
              bgColor={DUEDATE_COLOR.OK.bg}
              separator={{ padding: "p-2" }}
            >
              <Text
                text={tag}
                font={{
                  textTransform: "uppercase",
                  color: "text-white",
                  weight: "font-bold",
                }}
              />
            </Container>
          );
        })}
      </Container>

      {/* Avatar and other data */}
      <Container
        justify="justify-between"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        align="items-center"
        display="flex"
      >
        {/* Avatar */}
        <Container
          display="flex"
          gap="gap-2"
          flexWrap="flex-nowrap"
          align="items-center"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={getRandomAvatar()}
            alt="Photo profile"
          />
          {/* <Text
            text={assignee?.fullName}
            font={{
              color: "text-white",
              weight: "font-normal",
              size: "text-md",
            }}
          /> */}
        </Container>

        {/* Other data */}
        <Container display="flex" gap="gap-5">
          <Icon
            remixicon="ri-attachment-2"
            font={{ color: "text-white", size: "text-xl" }}
          />
          <Container
            gap="gap-1"
            display="flex"
            flexDirection="flex-row"
            flexWrap="flex-nowrap"
            align="items-center"
          >
            <Text text="5" font={{ color: "text-white", size: "text-md" }} />
            <Icon
              remixicon="ri-node-tree"
              font={{ color: "text-white", size: "text-xl" }}
            />
          </Container>
          <Container
            gap="gap-1"
            display="flex"
            flexDirection="flex-row"
            flexWrap="flex-nowrap"
            align="items-center"
          >
            <Text text="3" font={{ color: "text-white", size: "text-md" }} />
            <Icon
              remixicon="ri-chat-3-line"
              font={{ color: "text-white", size: "text-xl" }}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default CardTask;
