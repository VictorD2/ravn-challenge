import { ReactNode } from "react";
import {
  BackgroundColorType,
  BorderType,
  FontType,
  ShadowColorType,
  ShadowType,
  SizeType,
  TextColorType,
} from "../../styles/types";
import { LabelProps } from "../Label/Label.type";
import { TextProps } from "../Text/Text.type";

export type InputDateProps = {
  bgColor?: BackgroundColorType;
  border?: BorderType;
  className?: string;
  dateFormat?: "DD-MM-YYYY" | "YYYY-MM-DD" | "D d M, Y";
  getDate?: (date: any) => void;
  helpText?: TextProps;
  label?: LabelProps;
  name?: string;
  orientation?: "horizontal" | "vertical";
  placeholder?: string;
  required?: boolean;
  buttonNode: ReactNode;
  selectedDate?: string;
  shadow?: ShadowType;
  font?: FontType;
  shadowColor?: ShadowColorType;
  textColor?: TextColorType;
  value: string;
  size?: SizeType;
};
