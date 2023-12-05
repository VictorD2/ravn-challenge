"use client"
import { useEffect, useState } from "react";
import ClickOutSideComponent from "../../shared/hooks/useClickOutside";
import { classNames, mergeObjects } from "../../shared/utils/helpers";
import Container from "../Container";
import { DAYS, MONTH_NAMES, MONTH_SHORT_NAMES } from "./InputDate.const";
import { InputDateProps } from "./InputDate.type";
import {
  defaultBorder,
  defaultFont,
  defaultHelpText,
  defaultLabel,
  defaultShadow,
  defaultSize,
} from "./InputDate.default";
import Label from "../Label";
import Text from "../Text";
import moment from "moment";

const InputDate: React.FC<InputDateProps> = (props) => {
  const {
    bgColor = "bg-primary",
    border = {},
    dateFormat = "MMM. DD, YYYY",
    getDate,
    helpText = {},
    label = {},
    font = {},
    orientation = "vertical",
    required,
    shadow = {},
    value,
    buttonNode,
    size = {},
  } = props;

  const isHorizontal = orientation === "horizontal";
  const borderStyle = mergeObjects(defaultBorder, border);
  const helpTextStyle = mergeObjects(defaultHelpText, helpText);
  const labelStyle = mergeObjects(defaultLabel, label);
  const shadowStyle = mergeObjects(defaultShadow, shadow);
  const sizeStyle = mergeObjects(defaultSize, size);
  const fontStyle = mergeObjects(defaultFont, font);

  const [open, setOpen] = useState<boolean>(false);
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const formatDateForDisplay = (date: any): string => {
    let formattedDay = DAYS[date.getDay()];
    let formattedDate = ("0" + date.getDate()).slice(-2);
    let formattedMonth = MONTH_NAMES[date.getMonth()];
    let formattedMonthShortName = MONTH_SHORT_NAMES[date.getMonth()];
    let formattedMonthInNumber = ("0" + (Number(date.getMonth()) + 1)).slice(
      -2
    );
    let formattedYear = date.getFullYear();
    if (dateFormat === "DD-MM-YYYY")
      return `${formattedDate}-${formattedMonthInNumber}-${formattedYear}`;
    if (dateFormat === "YYYY-MM-DD")
      return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}`;
    if (dateFormat === "D d M, Y")
      return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}`;
    return `${formattedDay} ${formattedDate} ${formattedMonth} ${formattedYear}`;
  };

  const [valueInput, setValueInput] = useState<string>(() => {
    return formatDateForDisplay(moment(value).toDate());
  });

  useEffect(() => {
    getNoOfDays(new Date().getFullYear(), new Date().getMonth());
    return () => {
      setNoOfDays([]);
      setBlankDays([]);
    };
  }, []);

  const handleSetToday = () => {
    let selectedDate = new Date();
    setMonth(selectedDate.getMonth());
    setYear(selectedDate.getFullYear());
    getNoOfDays(new Date().getFullYear(), new Date().getMonth());
    setValueInput(formatDateForDisplay(selectedDate));
    if (getDate) getDate(selectedDate);
    setOpen(false);
  };

  const isSelectedDate = (date: any) => {
    const d = new Date(year, month, date);
    return valueInput === formatDateForDisplay(d);
  };

  const isToday = (date: any) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const getDateValue = (date: any) => {
    let selectedDate = new Date(year, month, date);
    setValueInput(formatDateForDisplay(selectedDate));
    isSelectedDate(date);
    if (getDate) getDate(selectedDate);
    setOpen(false);
  };

  const nextYear = () => {
    getNoOfDays(year + 1, month);
    setYear(year + 1);
  };

  const prevYear = () => {
    getNoOfDays(year - 1, month);
    setYear(year - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      getNoOfDays(year + 1, month);
      setYear(year + 1);
    } else {
      getNoOfDays(year, month + 1);
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      getNoOfDays(year - 1, 11);
      setMonth(11);
      setYear(year - 1);
    } else {
      getNoOfDays(year, month - 1);
      setMonth(month - 1);
    }
  };

  const getNoOfDays = (year: number, month: number) => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    // find where to start calendar day of week
    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) blankdaysArray.push(i);
    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);
    setNoOfDays(daysArray);
    setBlankDays(blankdaysArray);
  };

  return (
    <ClickOutSideComponent
      callback={() => setOpen(false)}
      className={classNames(
        sizeStyle.width,
        "flex flex-col items-start"
      )}
    >
      <Container
        position="relative"
        size={{ width: "w-full" }}
        flexDirection={isHorizontal ? "flex-row" : "flex-col"}
      >
        {labelStyle?.text?.length !== 0 && (
          <Container
            display="flex"
            flexDirection="flex-row"
            gap="gap-1"
            separator={{ margin: "my-1" }}
            size={{ height: "h-8" }}
          >
            <Container
              font={labelStyle.font}
              display="flex"
              flexDirection="flex-row"
              gap="gap-1"
              separator={{ margin: "my-1" }}
            >
              {/* Label */}
              <Label
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
          </Container>
        )}
        <Container
          display="flex"
          flexDirection="flex-col"
          size={{ width: "w-full" }}
        >
          <Container
            border={{
              style: borderStyle.style,
              size: borderStyle.size,
              color:
                helpTextStyle.text?.length !== 0
                  ? "border-red-600"
                  : borderStyle.color,
            }}
            className="transition-all duration-300"
            display="flex flex-nowrap"
            rounded="rounded-md"
            shadow={{
              color:
                helpTextStyle.text?.length !== 0
                  ? "shadow-red-600"
                  : shadowStyle.color,
              size:
                helpTextStyle.text?.length !== 0 ? "shadow" : shadowStyle.size,
            }}
            size={{ width: "w-full" }}
            onClick={() => setOpen(true)}
          >
            {buttonNode}
          </Container>
          {/* HelpText Section */}
          {helpTextStyle.text?.length !== 0 && (
            <Text
              className={classNames(helpTextStyle.className, "caption")}
              separator={helpTextStyle.separator}
              text={helpTextStyle.text}
              font={helpTextStyle.font}
              size={helpTextStyle.size}
            />
          )}
        </Container>
        {open && (
          // eslint-disable-next-line
          <Container
            className={classNames(
              isHorizontal ? "right-0 top-[65px]" : "right-0 top-[70px]",
              "z-10"
            )}
            position="absolute"
            font={{ color: fontStyle.color }}
            onClick={() => setOpen(true)}
            size={{ width: "w-[20rem]" }}
          >
            <Container
              bgColor={bgColor}
              border={{ size: "border-2", color: "border-gray-700" }}
              rounded="rounded-sm"
              shadow={{ size: "shadow-xl" }}
              separator={{ margin: "-mt-6" }}
            >
              <Container separator={{ padding: "p-4" }}>
                <Container
                  align="items-center"
                  display="flex"
                  justify="justify-between"
                  separator={{ margin: "mb-2" }}
                >
                  <Container
                    align="items-center"
                    display="flex"
                    justify="justify-between"
                  >
                    <button
                      className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline"
                      onClick={() => prevMonth()}
                      type="button"
                    >
                      <svg
                        className="inline-flex w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <Container
                      as="span"
                      font={{
                        size: "text-sm",
                        weight: "font-bold",
                        color: fontStyle.color,
                      }}
                    >
                      {MONTH_NAMES[month]}
                    </Container>
                    <button
                      className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline"
                      onClick={() => nextMonth()}
                      type="button"
                    >
                      <svg
                        className="inline-flex w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Container>
                  <Container
                    align="items-center"
                    display="flex"
                    justify="justify-between"
                  >
                    <button
                      className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline"
                      onClick={() => prevYear()}
                      type="button"
                    >
                      <svg
                        className="inline-flex w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <Container
                      as="span"
                      font={{
                        size: "text-sm",
                        weight: "font-bold",
                        color: fontStyle.color,
                      }}
                      separator={{ margin: "ml-1" }}
                    >
                      {year}
                    </Container>
                    <button
                      type="button"
                      onClick={() => nextYear()}
                      className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline"
                    >
                      <svg
                        className="inline-flex w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Container>
                </Container>
                <Container
                  display="flex flex-wrap"
                  flexDirection="flex-row"
                  separator={{ margin: "mb-3 -mx-1" }}
                >
                  {DAYS.map((item, i) => {
                    return (
                      <Container
                        size={{ width: "w-[14.26%]" }}
                        separator={{ padding: "px-0.5" }}
                        key={i}
                      >
                        <Container
                          font={{
                            size: "text-xs",
                            align: "text-center",
                            weight: "font-medium",
                            color: fontStyle.color,
                          }}
                        >
                          {item}
                        </Container>
                      </Container>
                    );
                  })}
                </Container>
                <Container display="flex flex-wrap" flexDirection="flex-row">
                  {blankDays.map((item, i) => {
                    return (
                      <Container
                        border={{ size: "border", color: "border-transparent" }}
                        font={{
                          size: "text-sm",
                          align: "text-center",
                          color: fontStyle.color,
                        }}
                        key={i}
                        separator={{ padding: "p-1" }}
                        size={{ width: "w-[14.28%]" }}
                      />
                    );
                  })}
                  {noOfDays.map((item, i) => {
                    return (
                      <Container
                        key={i}
                        separator={{ margin: "mb-1", padding: "px-1" }}
                        size={{ width: "w-[14.28%]" }}
                      >
                        {/* eslint-disable-next-line */}
                        <Container
                          className={`transition duration-100 ease-in-out cursor-pointer ${
                            isToday(item) &&
                            "border-[1px] border-secondary " + fontStyle.color
                          } ${
                            isSelectedDate(item) &&
                            "bg-secondary text-slate-100 hover:bg-opacity-75"
                          }`}
                          font={{
                            size: "text-sm",
                            align: "text-center",
                            color: fontStyle.color,
                          }}
                          onClick={() => getDateValue(item)}
                        >
                          {item}
                        </Container>
                      </Container>
                    );
                  })}
                </Container>
              </Container>
              <Container
                onClick={handleSetToday}
                className="cursor-pointer"
                border={{
                  size: "border-t-2",
                  color: "border-gray-700",
                }}
                size={{ width: "w-full" }}
                separator={{ padding: "p-4" }}
                font={{
                  color: "text-secondary",
                  align: "text-center",
                }}
              >
                Today
              </Container>
            </Container>
          </Container>
        )}
      </Container>
    </ClickOutSideComponent>
  );
};

export default InputDate;
