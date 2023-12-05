"use client";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider/GlobalProvider";
import { TaskProvider } from "@/shared/contexts/TaskProvider/TaskProvider";
import Container from "@/ui/Container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user: {
      user: { id },
    },
  } = useGlobalContext();
  return (
    <Container>
      <TaskProvider assigneeId={id}>
        <Container>{children}</Container>
      </TaskProvider>
    </Container>
  );
}
