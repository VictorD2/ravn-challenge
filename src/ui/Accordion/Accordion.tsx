import { Disclosure } from "@headlessui/react";
import { AccordionProps } from "./Accordion.type";
import { FC } from "react";
import Container from "../Container";
import Icon from "../Icon";

const Accordion: FC<AccordionProps> = (props) => {
  const {
    content,
    title,
    bgColor,
    border = {},
    separator = {},
    className,
    size = { width: "w-full" },
    rounded,
  } = props;
  return (
    <Container
      size={size}
      border={border}
      bgColor={bgColor}
      separator={separator}
      rounded={rounded}
      className={className}
    >
      <Disclosure defaultOpen={true} as="div">
        {({ open }) => (
          <>
            <Disclosure.Button className="p-2 w-full">
              <Container
                display="flex"
                flexDirection="flex-row"
                flexWrap="flex-nowrap"
                align="items-center"
              >
                <Container
                  transition
                  className={open ? "rotate-180 transform" : ""}
                >
                  <Icon
                    font={{ color: "text-gray-400", size: "text-2xl" }}
                    remixicon="ri-arrow-down-s-fill"
                  />
                </Container>
                {title}
              </Container>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              {content}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Container>
  );
};

export default Accordion;
