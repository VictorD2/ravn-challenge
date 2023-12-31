import {
  BorderType,
  FontType,
  SeparatorType,
  ShadowType,
  SizeType,
} from "@/styles/types";

export const defaultSeparator: SeparatorType = {
  padding: "px-4",
};

export const defaultShadow: ShadowType = {
  color: "",
};

export const defaultBorder: BorderType = {
  color: "border-secondary",
  size: "border-0",
};

export const defaultFont: FontType = {
  color: "text-black",
  size: "text-sm",
  weight: "font-normal",
  whiteSpace:"whitespace-nowrap"
};

export const defaultSize: SizeType = {
  minWidth: "",
  height: "h-10",
  width: "w-full",
};
