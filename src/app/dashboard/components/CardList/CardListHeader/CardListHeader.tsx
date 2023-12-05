import Container from "@/ui/Container";
import { FC } from "react";
import { CardListHeaderProps } from "./CardListHeader.type";
import Text from "@/ui/Text";

const CardListHeader: FC<CardListHeaderProps> = (props) => {
  const { isListMode } = props;
  const headerColumns = [
    { name: "# Task Name", col: "col-span-3" },
    { name: "Task Tags", col: "col-span-1" },
    { name: "Estimate", col: "col-span-1" },
    { name: "Task Assing Name", col: "col-span-1" },
    { name: "Due Date", col: "col-span-1" },
  ];

  return (
    <Container
      display="grid"
      className="grid-cols-7"
      bgColor="bg-primary"
      size={{ width: "w-full", minWidth: "min-w-[58.1875rem]" }}
      separator={{
        margin: isListMode ? "mt-4" : "my-4",
      }}
      rounded="rounded-lg"
      border={{
        size: "border-[0.5px]",
        color: "border-gray-700",
      }}
      font={{ color: "text-white" }}
    >
      {headerColumns.map((column, index) => {
        return (
          <Container
            key={column.name}
            className={column.col}
            separator={{ padding: "p-4" }}
            border={{
              size:
                index === 0 || index === headerColumns.length - 1
                  ? ""
                  : "border-l-[0.5px] border-r-[0.5px]",
              color: "border-gray-700",
            }}
          >
            <Text className="truncate" text={column.name} />
          </Container>
        );
      })}
    </Container>
  );
};

export default CardListHeader;
