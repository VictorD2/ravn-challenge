/* eslint-disable @next/next/no-img-element */
import Container from "@/ui/Container";
import InputText from "@/ui/InputText";
import { MonsterInputProps } from "./MonsterInput.type";
import { FC } from "react";
import Icon from "@/ui/Icon";

const MonsterInput: FC<MonsterInputProps> = (props) => {
  const { ...rest } = props;
  return (
    <Container size={{ width: "w-full" }} position="relative">
      <InputText
        bgColor="bg-primary"
        border={{ size: "border-0" }}
        separator={{ padding: "pl-20 py-4" }}
        placeholder="Search"
        font={{ color: "text-white" }}
        rounded="rounded-2xl"
        {...rest}
      />
      {/* Search Icon */}
      <Container className="absolute top-[50%] translate-y-[-50%] left-10">
        <Icon
          remixicon="ri-search-line"
          font={{ color: "text-gray-400", size: "text-2xl" }}
        />
      </Container>

      {/* Notificacion Icon */}
      <Container className="absolute top-[50%] translate-y-[-50%] right-24">
        <Icon
          remixicon="ri-notification-line"
          font={{ color: "text-gray-400", size: "text-2xl" }}
        />
      </Container>

      {/* Profile Photo */}
      <Container className="absolute top-[50%] translate-y-[-50%] right-8">
        <img
          className="w-10 h-10 rounded-full"
          alt="Photo profile"
          src={"https://picsum.photos/200/200"}
        />
      </Container>
    </Container>
  );
};

export default MonsterInput;
