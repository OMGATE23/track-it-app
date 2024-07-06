import { useDateContext } from "@/context/DateContext";
import { sameDate } from "@/helpers/timefunctions";
import React, { useEffect, useState } from "react";
import TimeBox from "./TimeBox";
import { Task, useTaskContext } from "@/context/TaskContext";
import { CreateTaskType } from "./WeekGrid";
import TaskDisplay from "./TaskDisplay";
import { MONTHS, weekDays } from "@/helpers/constansts";

export type StructuredTaskType = {
  title: string;
  description?: string;
  date: Date;
  startTime: number;
  endTime: number;
  id: string;
  hallNumber: number;
  colour: string;
};

const DayView = ({
  day,
  timeIntervals,
  setCreateTaskData,
  setShowCreateTask,
  dayNumber,
}: {
  day: Date;
  dayNumber: number;
  setCreateTaskData: React.Dispatch<React.SetStateAction<CreateTaskType>>;
  setShowCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  timeIntervals: {
    start: number;
    end: number;
  }[];
}) => {
  const { state: dateState, dispatch: dateDispatch } = useDateContext();
  const { tasksState } = useTaskContext();
  const [displayTasks, setDisplayTasks] = useState<StructuredTaskType[]>([]);
  const { tasks } = tasksState;

  function getFormatedTasks() {
    let todaysTasks = tasks
      .filter((task) => sameDate(task.date, day))
      .sort((a, b) => a.startTime - b.endTime);

    if (todaysTasks.length === 0) {
      return [];
    }

    let solution = [];
    for (let task of todaysTasks) {
      let taskScheduled = false;
      for (let hall of solution) {
        if (hall[hall.length - 1].endTime <= task.startTime) {
          hall.push(task);
          taskScheduled = true;
          break;
        }
      }
      if (!taskScheduled) {
        solution.push([task]);
      }
    }
    solution = solution.sort((a, b) => {
      if (a[0].startTime < b[0].startTime) return -1;
      if (a[0].startTime > b[0].startTime) return 1;

      const durationA = a[0].endTime - a[0].startTime;
      const durationB = b[0].endTime - b[0].startTime;

      return durationB - durationA;
    });
    let structuredTasks: StructuredTaskType[] = [];
    for (let i = 0; i < solution.length; i++) {
      for (let j = 0; j < solution[i].length; j++) {
        structuredTasks.push({ ...solution[i][j], hallNumber: i });
      }
    }
    return structuredTasks;
  }
  useEffect(() => {
    const structuredTasks = getFormatedTasks();
    setDisplayTasks(structuredTasks || []);
  }, [tasks]);
  return (
    <div className="min-w-32 relative border-[0.5px] border-zinc-200">
      <button
        onClick={() => {
          dateDispatch({
            type: "SELECTED_DATE",
            payload: {
              selectedDate: day,
            },
          });
        }}
        className={` w-full bg-white sticky top-0 z-[9999999999] font-[300] border-b border-zinc-200 select-none px-4 py-1 h-16 flex items-center justify-center gap-2 text-center`}
      >
        <span className={`${sameDate(day , new Date(Date.now())) ? 'bg-zinc-200' : ''} text-2xl text-zinc-900 w-10 h-10 rounded-full flex items-center justify-center`}>{day.getDate()}</span>
        <span className="text-zinc-600 font-[200]">{weekDays[day.getDay()]}</span>
      </button>
      <div className="relative">
        {timeIntervals.map((interval) => (
          <TimeBox
            setCreateTaskData={setCreateTaskData}
            setShowCreateTask={setShowCreateTask}
            key={interval.end}
            timeInterval={interval}
            day={day}
          />
        ))}

        {displayTasks.length > 0 &&
          displayTasks.map((task) => (
            <TaskDisplay
              dayNumber={dayNumber}
              key={task.id + task.startTime + task.endTime}
              task={task}
            />
          ))}
      </div>
    </div>
  );
};

export default DayView;
