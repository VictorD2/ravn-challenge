import { FC } from "react";
import { ItemProps } from "./Item.type";
import { Menu } from "@headlessui/react";
import Button from "../../Button";
import { classNames, mergeObjects } from "@/shared/utils/helpers";
import { defaultBorder, defaultFont, defaultSeparator } from "./Item.default";

const Item: FC<ItemProps> = (props) => {
  const {
    justify = "justify-start",
    gap = "gap-5",
    remixicon = "",
    rounded = "rounded-lg",
    separator = {},
    text,
    font = {},
    bgColor = "hover:bg-primary bg-white",
    className,
    border = {},
    children,
    ...rest
  } = props;

  const fontStyle = mergeObjects(defaultFont, font);
  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const borderStyle = mergeObjects(defaultBorder, border);

  return (
    <Menu.Item>
      <>
        <Button
          className={classNames(className, "group")}
          text={text}
          remixicon={remixicon}
          onClick={() => {}}
          bgColor={bgColor}
          font={fontStyle}
          justify={justify}
          gap={gap}
          border={borderStyle}
          rounded={rounded}
          separator={separatorStyle}
          {...rest}
        >
          {children}
        </Button>
      </>
    </Menu.Item>
  );
};

export default Item;
