import {
  BackgroundColorType,
  BorderType,
  RoundedType,
  SeparatorType,
  SizeType,
} from "@/styles/types";
import { ReactNode } from "react";

export type DropdownMenuProps = {
  bgColor?: BackgroundColorType;
  buttonNode: ReactNode;
  children: ReactNode;
  border?: BorderType;
  positionAbs?: string;
  separator?: SeparatorType;
  size?: SizeType;
  rounded?: RoundedType;
  show?: boolean;
};
