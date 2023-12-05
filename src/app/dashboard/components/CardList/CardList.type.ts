import { ReactNode } from "react";

export type CardListProps = {
  children: ReactNode;
  name: string;
  quantity: number;
  isListMode?: boolean;
};
