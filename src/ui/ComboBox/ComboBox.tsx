import { ComboBoxProps } from "./ComboBox.type";
import Select from "react-select";
import Container from "../Container/Container";
import { classNames, mergeObjects } from "@/shared/utils/helpers";
import {
  defaultBorder,
  defaultFont,
  defaultHelpText,
  defaultLabel,
  defaultSeparator,
  defaultShadow,
  defaultSize,
} from "./ComboBox.default";
import Label from "../Label";
import tailwindColors from "tailwindcss/colors";
import tailwindConfig from "../../../tailwind.config"; // Asegúrate de que la ruta sea correcta

const ComboBox = <T extends {}>(props: ComboBoxProps<T>) => {
  const {
    onChange,
    classNameCaption = "",
    labelField,
    valueField,
    onFocus,
    name,
    id = name,
    value,
    items,
    className = "",
    required = false,
    placeholder = "Select an item",
    border = {},
    helpText = {},
    label = {},
    shadow = {},
    size = {},
    orientation = "vertical",
    separator = {},
    font = {},
    ...rest
  } = props;

  const isHorizontal = orientation === "horizontal";
  const borderStyle = mergeObjects(defaultBorder, border);
  const helpTextStyle = mergeObjects(defaultHelpText, helpText);
  const labelStyle = mergeObjects(defaultLabel, label);
  const shadowStyle = mergeObjects(defaultShadow, shadow);
  const sizeStyle = mergeObjects(defaultSize, size);
  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const fontStyle = mergeObjects(defaultFont, font);

  const getValues = () => {
    const values = [];
    for (let i = 0; i < items.length; i += 1) {
      const element = items[i];
      values.push({
        label: element[labelField],
        value: element[valueField],
        ...element,
      });
    }
    return values;
  };

  const getValue = () => {
    return {
      label: value[labelField],
      value: value[valueField],
      ...value,
    };
  };

  return (
    <Container
      size={sizeStyle}
      align="items-start"
      display="flex flex-nowrap"
      flexDirection={isHorizontal ? "flex-row" : "flex-col"}
      justify="justify-start"
    >
      {/* Label Section */}
      {labelStyle?.text?.length !== 0 && (
        <Container
          font={labelStyle.font}
          display="flex"
          flexDirection="flex-row"
          gap="gap-1"
          separator={{ margin: "my-1" }}
        >
          {/* Label */}
          <Label
            htmlFor={id}
            className={classNames(labelStyle.className)}
            font={labelStyle.font}
            size={{
              width: isHorizontal ? labelStyle.size?.width : "",
              ...labelStyle.size,
            }}
            text={labelStyle.text}
          >
            {/* IsRquired */}
            {required && (
              <Container
                as="span"
                separator={{ padding: "pl-1" }}
                display="inline"
                font={{ color: "text-red-600" }}
              >
                *
              </Container>
            )}
          </Label>
        </Container>
      )}
      {/* Input Container */}
      <Container
        display="flex"
        flexDirection="flex-col"
        size={{ width: "w-full" }}
      >
        <Select
          isSearchable={false}
          name={name}
          id={id}
          // minMenuHeight={180}
          styles={{
            option: (provided: any, state: any) => ({
              ...provided,
              color: state.isSelected
                ? tailwindColors.white
                : tailwindColors.black,
              backgroundColor: state.isSelected
                ? tailwindConfig.theme.colors.secondary
                : tailwindColors.white,
            }),
            // "#ef4444"
            control: (base: any) => ({
              ...base,
              height: "35px",
              minHeight: "35px",
              backgroundColor:  tailwindConfig.theme.colors.primary,
              border: "",
              borderWidth: "0px",
              "&:hover": {
                borderColor: `${
                  helpTextStyle.text?.length !== 0
                    ? tailwindColors.red[500]
                    : tailwindColors.gray[700]  
                }`,
                borderWidth: "1px",
              },
              "&:focus": {
                borderColor: tailwindConfig.theme.colors.secondary,
              },
              "&:active": {
                borderColor: tailwindConfig.theme.colors.secondary,
              },
            }),
            indicatorSeparator: () => ({ display: "none" }),
            dropdownIndicator: (provided) => ({ ...provided, display: "none" }),
          }}
          // maxMenuHeight={180}
          className={classNames(
            className,
            fontStyle.color,
            separatorStyle.margin,
            separatorStyle.padding,
            "focus:outline-none appearance-none w-full",
            borderStyle.focusColor,
            borderStyle.color,
            borderStyle.size
          )}
          onChange={onChange}
          placeholder={placeholder}
          tabIndex={200}
          onFocus={(e: any) => {
            if (onFocus) onFocus(e);
          }}
          value={getValue()}
          options={getValues()}
          {...rest}
        />
        {helpTextStyle.text?.length !== 0 && (
          <Container
            font={helpTextStyle.font}
            className={classNames("caption mt-1", `h-2`, `${classNameCaption}`)}
          >
            {helpText.text}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default ComboBox;
