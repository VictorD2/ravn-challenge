import {
  BackgroundColorType,
  BorderType,
  RoundedType,
  SeparatorType,
  SizeType,
} from "@/styles/types";
import { ReactNode } from "react";

export type AccordionProps = {
  title: ReactNode;
  content: ReactNode;
  bgColor?: BackgroundColorType;
  border?: BorderType;
  separator?: SeparatorType;
  size?: SizeType;
  className?: string;
  rounded?: RoundedType;
};
