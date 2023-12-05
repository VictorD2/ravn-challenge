"use client"
import { FC, useRef } from "react";
import { CheckBoxProps } from "./CheckBox.type";
import Container from "../Container";
import Text from "../Text";
import { mergeObjects } from "@/shared/utils/helpers";
import { defaultFont, defaultSize } from "./CheckBox.default";
import Icon from "../Icon";

const CheckBox: FC<CheckBoxProps> = (props) => {
  const {
    className = "",
    text = "",
    font = {},
    size = {},
    children,
    onChange,
    checked,
    ...rest
  } = props;
  const sizeStyle = mergeObjects(defaultSize, size);
  const fontStyle = mergeObjects(defaultFont, font);

  const inputCheck = useRef<HTMLInputElement>(null);

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  return (
    <Container
      className={className}
      display="flex"
      flexDirection="flex-row"
      flexWrap="flex-nowrap"
      gap="gap-4"
      size={sizeStyle}
      position="relative"
    >
      <input
        ref={inputCheck}
        className="default:ring-2 checked:bg-blue-500 cursor-pointer absolute w-full h-full opacity-0 top-0 left-0"
        type="checkbox"
        checked={checked}
        onChange={handleChangeChecked}
        {...rest}
      />
      <Container
        size={{ width: "w-5", height: "h-5" }}
        bgColor={checked ? "bg-secondary" : "bg-primary"}
        border={{ color: "border-white", size: "border" }}
        display="flex"
        align="items-center"
        justify="justify-center"
      >
        <Icon
          remixicon="ri-check-line"
          font={{
            size: "text-xs",
            color: checked ? "text-white" : "text-primary",
          }}
        />
      </Container>
      <Text font={fontStyle} size={{ width: "" }} text={text} />
    </Container>
  );
};

export default CheckBox;
