"use client";
import { useDateContext } from "@/context/DateContext";
import { numberToTime, sameDate } from "@/helpers/helper";
import React, { useState } from "react";
import DayView from "./DayView";
import CreateEventModal from "../CreateEventModal";
import { Task } from "@/helpers/types";
import UpdateEventModal from "../UpdateEventModal";
import TaskInfo from "./TaskInfo";

export type CreateTaskType = {
  start: number;
  taskDate: Date;
};

const WeekGrid = () => {
  const { state: dateState } = useDateContext();
  const [showCreateTask, setShowCreateTask] = useState<boolean>(false);
  const [createTaskData, setCreateTaskData] = useState<CreateTaskType>({
    start: 0,
    taskDate: dateState.displayDate,
  });
  const [showUpdateTask , setShowUpdateTask] = useState<boolean>(false)
  const [updateTaskData, setUpdateTaskData] = useState<Task>()
  const [showInfo , setShowInfo] = useState(false)
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
      <div className="calendar-display flex items-start max-h-[100%] overflow-auto">
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
            setShowInfo={setShowInfo}
            setUpdateTaskData = {setUpdateTaskData}
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
      {
        showUpdateTask && updateTaskData && <UpdateEventModal setShowUpdateTask={setShowUpdateTask} updateTaskData={updateTaskData} />
      }

      {
        showInfo && updateTaskData && <TaskInfo setShowInfo={setShowInfo} setShowUpdateModal={setShowUpdateTask} task={updateTaskData} />
      }
    </>
  );
};

export default WeekGrid;
