"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import { ItemProps } from "./Item.type";
import Container from "@/ui/Container";
import Icon from "@/ui/Icon";
import Text from "@/ui/Text";

const Item: FC<ItemProps> = (props) => {
  const { icon, link, name } = props;
  const pathname = usePathname();

  const isSelected = pathname === link;

  return (
    <Link href={link}>
      <Container
        border={{
          size: isSelected ? "border-r-4" : "border-0",
          color: "border-secondary",
        }}
        bgColor={isSelected ? "bg-gradient-to-l from-[#3A3134] to-primary" : ""}
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        align="items-center"
        gap="gap-4"
        className="group"
        separator={{ padding: "p-4" }}
      >
        <Icon
          className="transition-all duration-500"
          remixicon={icon}
          font={{
            color: isSelected
              ? "text-secondary"
              : "text-gray-400 group-hover:text-secondary",
            size: "text-md",
            weight: "font-bold",
            textTransform: "uppercase",
          }}
        />
        <Text
          text={name}
          className="transition-all duration-500"
          font={{
            color: isSelected
              ? "text-secondary"
              : "text-gray-400 group-hover:text-secondary",
            size: "text-sm",
            weight: "font-bold",
            textTransform: "uppercase",
          }}
        />
      </Container>
    </Link>
  );
};

export default Item;
