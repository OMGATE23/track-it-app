"use client";

import { useDateContext } from "@/context/DateContext";
import { MONTHS } from "../helpers/constansts";
import { sameDate } from "@/helpers/timefunctions";

export default function Calendar() {
  let { state, dispatch } = useDateContext();
  let displayDate = state.displayDate;
  let days = getDatesInCurrentMonth();

  function previousMonthHandler() {
    let newDate = new Date(displayDate);
    newDate.setMonth(displayDate.getMonth() - 1);

    dispatch({
      type: "DISPLAY_DATE",
      payload: {
        displayDate: newDate,
      },
    });
  }

  function nextMonthHandler() {
    let newDate = new Date(displayDate);
    newDate.setMonth(displayDate.getMonth() + 1);

    dispatch({
      type: "DISPLAY_DATE",
      payload: {
        displayDate: newDate,
      },
    });
  }
  function getDatesInCurrentMonth(): Array<Date> {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    let firstDay = new Date(year, month, 1);
    let firstDayPrevWeek = new Date(year, month, 1 - firstDay.getDay());

    let lastDay = new Date(year, month + 1, 0);
    let lastDayNextWeek = new Date(year, month + 1, 6 - lastDay.getDay());
    const datesArray = [];
    let curr = new Date(firstDayPrevWeek);
    while (curr <= lastDayNextWeek) {
      datesArray.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    return datesArray;
  }
  function isSameMonth(date: Date) {
    return date.getMonth() === displayDate.getMonth();
  }

  return (
    <div className="h-fit w-fit border border-neutral-100 p-4 shadow-md rounded-md sticky top-4 flex flex-col items-center gap-2 ">
      <div className="flex items-center justify-between w-full ">
        <button onClick={previousMonthHandler}>
            <img alt = "left" className="w-5" src="/assets/icons/chevronLeft.svg" />
          </button>
        <h1 className="text-center font-semibold">
          {MONTHS[displayDate.getMonth()]}, {displayDate.getFullYear()}
        </h1>
        <button onClick={nextMonthHandler}>
            <img alt = "right" className="w-5" src="/assets/icons/chevronRight.svg" />
        </button>
      </div>
      <div className="grid grid-date-header text-xs justify-center items-center ">
        <div className="font-semibold">S</div>
        <div className="font-semibold">M</div>
        <div className="font-semibold">T</div>
        <div className="font-semibold">W</div>
        <div className="font-semibold">T</div>
        <div className="font-semibold">F</div>
        <div className="font-semibold">S</div>
      </div>
      <div className="calendar text-xs justify-center items-center">
        {days.map((date) => (
          <button
            key={date.getTime()}
            onClick={() => {
              dispatch({
                type: "SELECTED_DATE",
                payload: {
                  selectedDate: date,
                },
              });
            }}
            className={`day ${
              !isSameMonth(date) && "text-gray-400"
            } mx-auto items-center justify-items-center  rounded-md w-6 h-6  justify-center ${
              sameDate(date, new Date(Date.now()))
                ? "bg-black text-white  hover:bg-black"
                : "hover:bg-gray-100"
            }`}
          >
            <time
              dateTime={`${date.getDate}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}
            >
              {date.getDate()}
            </time>
          </button>
        ))}
      </div>
    </div>
  );
}
