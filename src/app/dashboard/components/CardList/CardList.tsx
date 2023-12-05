"use client";
import { FC } from "react";
import { CardListProps } from "./CardList.type";
import Container from "@/ui/Container";
import Text from "@/ui/Text";
import Accordion from "@/ui/Accordion";

const CardList: FC<CardListProps> = (props) => {
  const { children, name, quantity, isListMode = true } = props;

  if (isListMode) {
    return (
      <Container
        display="flex"
        flexDirection="flex-col"
        flexWrap="flex-nowrap"
        size={{ width: "w-full", minWidth: "min-w-[58.1875rem]" }}
        gap="gap-4"
      >
        <Accordion
          rounded="rounded-lg"
          bgColor="bg-primary"
          size={{ width: "w-full" }}
          border={{ color: "border-gray-700", size: "border-[0.5px]" }}
          title={
            <Container
              separator={{ padding: "py-2 px-2" }}
              display="flex"
              flexDirection="flex-row"
              flexWrap="flex-nowrap"
              justify="justify-start"
              gap="gap-2"
              size={{ width: "w-full" }}
            >
              <Container>
                <Text
                  font={{
                    whiteSpace: "whitespace-nowrap",
                    color: "text-white",
                    size: "text-lg",
                    weight: "font-normal",
                  }}
                  text={name}
                />
              </Container>
              <Container>
                <Text
                  font={{
                    whiteSpace: "whitespace-nowrap",
                    color: "text-gray-400",
                    size: "text-lg",
                    weight: "font-normal",
                  }}
                  text={`(${quantity < 10 ? `0${quantity}` : quantity})`}
                />
              </Container>
            </Container>
          }
          content={children}
        />
      </Container>
    );
  }

  return (
    <Container
      display="flex"
      flexDirection="flex-col"
      size={{ minWidth: "min-w-[23.75rem]", minHeight: "min-h-[45rem]" }}
      gap="gap-4"
      border={{ size: "border-[1px]", color: "border-gray-800" }}
      separator={{ padding: "p-4" }}
    >
      <Container separator={{ margin: "mb-2" }}>
        <Text
          font={{
            color: "text-white",
            size: "text-lg",
            weight: "font-normal",
          }}
          text={`${name} (${quantity < 10 ? `0${quantity}` : quantity})`}
        />
      </Container>
      {children}
    </Container>
  );
};

export default CardList;
