"use client";
import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment, useRef, useState } from "react";
import { classNames, mergeObjects } from "@/shared/utils/helpers";
import {
  defaultBorder,
  defaultSeparator,
  defaultSize,
} from "./Dropdown.default";
import { DropdownMenuProps } from "./DropdownMenu.type";
import Container from "../Container";

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const {
    children,
    buttonNode,
    positionAbs = "",
    bgColor,
    rounded = "",
    size = {},
    separator = {},
    border = {},
    show,
  } = props;

  const dropdown = useRef<HTMLDivElement>(null);
  const [outOfWindowmRight, setOutOfWindowRight] = useState<boolean>(false);
  const [outOfWindowmLeft, setOutOfWindowLeft] = useState<boolean>(false);
  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const borderStyle = mergeObjects(defaultBorder, border);
  const sizeStyle = mergeObjects(defaultSize, size);

  const handleOpenDropdown = (e: React.MouseEvent) => {
    const botonRect = e.currentTarget.getBoundingClientRect();
    // Determina si el dropdown se encuentra cerca del borde derecho o izquierdo de la pantalla.
    // if (!dropdown.current) return;
    const isNearRightEdge = window.innerWidth - botonRect.right < 100;
    const isNearLeftEdge = botonRect.left < 100;
    setOutOfWindowRight(isNearRightEdge);
    setOutOfWindowLeft(isNearLeftEdge);
    // Calcula las nuevas coordenadas para el dropdown.
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Container onMouseEnter={handleOpenDropdown} className="w-full">
        <Menu.Button as="div" className="w-full">
          <Container
            display="flex"
            flexDirection="flex-row"
            justify="justify-between"
            align="items-center"
            size={{ width: "w-full" }}
          >
            {buttonNode}
          </Container>
        </Menu.Button>
      </Container>
      <Transition
        show={show}
        as={Fragment}
        leaveFrom={classNames("transform opacity-100 scale-100", bgColor)}
        enterTo={classNames("transform opacity-100 scale-100", bgColor)}
        enterFrom={classNames("transform opacity-0 scale-95", bgColor)}
        enter={classNames("transition ease-out duration-100", bgColor)}
        leaveTo={classNames("transform opacity-0 scale-95", bgColor)}
        leave={classNames("transition ease-in duration-75", bgColor)}
      >
        <Menu.Items
          ref={dropdown}
          className={classNames(
            bgColor,
            outOfWindowmRight
              ? "right-[0.5rem]"
              : outOfWindowmLeft
              ? "-top-1 -right-[90%]"
              : positionAbs,
            "absolute focus:outline-none z-50 overflow-y-auto",
            rounded,
            sizeStyle.width,
            sizeStyle.height,
            sizeStyle.minWidth,
            sizeStyle.maxWidth,
            sizeStyle.maxHeight,
            sizeStyle.minHeight,
            separatorStyle.margin,
            separatorStyle.padding,
            borderStyle.color,
            borderStyle.size,
            borderStyle.style,
            borderStyle.focusColor,
            borderStyle.hoverColor
          )}
        >
          <Container
            rounded={rounded}
            border={borderStyle}
            bgColor={bgColor}
            separator={{ padding: "px-1 py-1" }}
          >
            {children}
          </Container>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
