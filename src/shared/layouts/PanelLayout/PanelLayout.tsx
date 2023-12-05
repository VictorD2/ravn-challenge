"use client";
import { FC, useState } from "react";
import { PanelLayoutProps } from "./PanelLayout.type";
import Container from "@/ui/Container";
import Sidebar from "./Sidebar";
import links from "@/shared/routes/routes.user";
import Icon from "@/ui/Icon";
import { classNames } from "@/shared/utils/helpers";

const PanelLayout: FC<PanelLayoutProps> = (props) => {
  const { children } = props;
  const [showMenu, setShowMenu] = useState(false);

  const handleChangeShowMenu = (value: boolean) => {
    return () => {
      setShowMenu(value);
    };
  };

  return (
    <Container
      size={{ width: "w-full" }}
      display="flex"
      flexDirection="flex-row"
      flexWrap="flex-nowrap"
      position="relative"
    >
      <Container
        display="lg:hidden md:flex flex"
        position="absolute"
        size={{ width: "w-12", height: "h-12" }}
        rounded="rounded-full"
        bgColor="bg-primary"
        className={classNames(
          "top-[50%] -left-6 translate-y-[-50%] cursor-pointer z-[150]",
          showMenu ? "translate-x-[20rem]" : ""
        )}
        align="items-center"
        justify="justify-center"
        border={{
          color: "border-gray-700",
          size: "border",
        }}
        transition
        onClick={handleChangeShowMenu(!showMenu)}
      >
        <Icon
          remixicon="ri-arrow-right-s-fill"
          className={classNames(
            showMenu ? "rotate-180" : "",
            "transform transition-all duration-500"
          )}
          font={{
            color: "text-white",
            size: showMenu ? "text-4xl" : "text-6xl",
          }}
        />
      </Container>
      {/* Left Side */}
      <Container
        rounded="rounded-3xl"
        size={{
          width: "w-[20rem]",
          minHeight: "min-h-screen",
        }}
        display="flex"
        align="items-center"
        separator={{ padding: "lg:p-4 md:p-0" }}
        transition
        className={classNames(
          "lg:relative md:absolute absolute lg:translate-x-[0rem] translate-x-[-20rem] z-[100]",
          showMenu ? "translate-x-[0rem]" : ""
        )}
      >
        <Sidebar routes={links} />
      </Container>
      {/* Right Sideº */}
      <Container
        as="main"
        className="overflow-y-auto"
        size={{
          width: "lg:w-10/12 md:w-full w-full",
          minHeight: "min-h-screen",
          maxHeight: "max-h-screen",
        }}
      >
        {children}
      </Container>
    </Container>
  );
};

export default PanelLayout;
