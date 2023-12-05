"use client";

import Container from "@/ui/Container";
import Icon from "@/ui/Icon";

const Loading = () => {
  return (
    <Container
      size={{
        minHeight: "min-h-screen",
        width: "w-full",
      }}
      bgColor="bg-primary"
      display="flex"
      justify="justify-center"
      align="items-center"
    >
      <Container className="animate-spin" separator={{ padding: "p-10" }}>
        <Icon
          remixicon="ri-loader-4-line"
          font={{ color: "text-white", size: "text-9xl" }}
        />
      </Container>
    </Container>
  );
};

export default Loading;
