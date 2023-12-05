/* eslint-disable @next/next/no-img-element */
"use client";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider/GlobalProvider";
import Container from "@/ui/Container";
import Text from "@/ui/Text";
import moment from "moment";

const SettingsPage = () => {
  const {
    user: {
      user: { fullName, email, type, createdAt, updatedAt },
    },
  } = useGlobalContext();
  return (
    <Container
      size={{ minHeight: "min-h-screen", width: "w-full" }}
      display="flex"
      justify="justify-center"
      align="items-center"
    >
      <title>Settings</title>
      <Container
        font={{ color: "text-white", align: "text-center" }}
        display="flex"
        flexDirection="flex-col"
        justify="justify-center"
        gap="gap-5"
        align="items-center"
      >
        <img
          className="w-48 h-48 rounded-full ring-secondary ring-2"
          alt="Photo profile"
          src={"https://picsum.photos/200/200"}
        />
        <Text font={{ size: "text-2xl" }} text={fullName} />
        <Text font={{ size: "text-2xl" }} text={email} />
        <Text font={{ size: "text-2xl" }} text={type} />
        <Text font={{ size: "text-2xl" }} text={"Date of admission: "+moment(createdAt).format("YYYY-MM-DD")} />
        <Text font={{ size: "text-2xl" }} text={"Update date: "+moment(updatedAt).format("YYYY-MM-DD")} />
      </Container>
    </Container>
  );
};

export default SettingsPage;
