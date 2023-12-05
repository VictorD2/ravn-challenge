"use client";
import RavnLogo from "@/shared/assets/svg/ravm-logo";
import Container from "@/ui/Container";
import { SidebarProps } from "./Sidebar.type";
import { FC } from "react";
import Item from "./Item";
import styles from "./Sidebar.module.css";
import { classNames } from "@/shared/utils/helpers";

const Sidebar: FC<SidebarProps> = (props) => {
  const { routes = [] } = props;

  return (
    <Container
      as="aside"
      bgColor="bg-primary"
      rounded="rounded-3xl"
      className={classNames(styles.sidebar)}
      size={{ width: "w-full", minHeight: "min-h-full" }}
    >
      {/* Logo Company */}
      <Container
        size={{ width: "w-full", height: "h-10" }}
        display="flex"
        justify="justify-center"
        separator={{ padding: "pt-4" }}
      >
        <RavnLogo isShowA={false} isShowN={false} isShowV={false} isShowR />
      </Container>

      {/* Routes List*/}
      <Container
        flexWrap="flex-nowrap"
        display="flex"
        className={classNames(styles.sidebarScroll, "overflow-y-auto")}
        flexDirection="flex-col"
        size={{
          width: "w-full",
          minHeight: "min-h-full",
          height: "h-[calc(100vh-7rem)]",
        }}
        separator={{ margin: "mt-10" }}
      >
        {routes.map((item) => {
          return <Item {...item} key={item.link} />;
        })}
      </Container>
    </Container>
  );
};

export default Sidebar;
