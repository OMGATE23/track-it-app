"use client";
import { useDateContext } from "@/context/DateContext";
import { numberToTime, sameDate } from "@/helpers/timefunctions";
import React, { useState } from "react";
import DayView from "./DayView";
import CreateEventModal from "../CreateEventModal";

export type CreateTaskType = {
  start: number;
  taskDate: Date;
};

const WeekGrid = () => {
  const { state: dateState } = useDateContext();
  const [showCreateTask, setShowCreateTask] = useState<boolean>(false);
  const [createTaskData, setCreateTaskData] = useState<CreateTaskType>({
    start: 0,
    taskDate: dateState.selectedDate,
  });

  function getDisplayWeek(): Date[] {
    const dayOfWeek = dateState.displayDate.getDay();
    const daysInSameWeek = [];

    const startingDay = new Date(dateState.displayDate);
    startingDay.setDate(dateState.displayDate.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const newDay = new Date(startingDay);
      newDay.setDate(startingDay.getDate() + i);
      newDay.setHours(6);
      daysInSameWeek.push(newDay);
    }
    return daysInSameWeek;
  }
  function getTimeIntervals() {
    const intervals = [];
    const start = new Date(dateState.displayDate);
    start.setHours(0, 0, 0, 0);

    for (let i = 0; i < 96; i++) {
      intervals.push({
        start: i * 15,
        end: (i + 1) * 15,
      });
    }

    return intervals;
  }
  let timeIntervals = getTimeIntervals();
  let displayWeek = getDisplayWeek();
  return (
    <>
      <div className="flex items-start max-h-[300px] overflow-y-scroll">
        <div className="w-32 text-xs text-zinc-700">
          <div className="h-14 py-2 px-1 flex justify-end items-end">
            GMT + {numberToTime(new Date(Date.now()).getTimezoneOffset())}
          </div>
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-32 h-16 text-right px-1 relative "
            >
              {numberToTime(i * 60)}
            </div>
          ))}
        </div>
        {displayWeek.map((day, index) => (
          <DayView
            setCreateTaskData={setCreateTaskData}
            setShowCreateTask={setShowCreateTask}
            key={day.getTime()}
            day={day}
            timeIntervals={timeIntervals}
            dayNumber={index}
          />
        ))}
      </div>
      {showCreateTask && (
        <CreateEventModal
          setShowCreateTask={setShowCreateTask}
          createTaskData={createTaskData}
        />
      )}
    </>
  );
};

export default WeekGrid;
