import { FontType, SizeType } from "@/styles/types";

export interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  font?: FontType;
  text?: string;
  size?: SizeType;
}
