"use client";
import { TaskProvider } from "@/shared/contexts/TaskProvider/TaskProvider";
import Container from "@/ui/Container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <TaskProvider>
        <Container>{children}</Container>
      </TaskProvider>
    </Container>
  );
}
