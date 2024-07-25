import { useTaskContext } from "@/context/TaskContext";
import {
  countAndAvgTasksByDate,
  countTasksByDate,
  dayMonthDateFormat,
  getAverageTaskTime,
  getDatesInSameWeek,
} from "@/helpers/helper";
import React from "react";
import DatePicker from "../calendar-components/DatePicker";

import { useDateContext } from "@/context/DateContext";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TasksByTags from "./TasksByTags";

const TasksAnalytics = (): JSX.Element => {
  const { tasksState } = useTaskContext();
  const { state: dateState } = useDateContext();

  let taskData = countAndAvgTasksByDate(
    getDatesInSameWeek(dateState.displayDate),
    tasksState.tasks
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-3xl font-semibold text-zinc-800 text-center w-[90%] mx-auto">
        Tasks Analysis
      </h2>
      <div className="flex flex-col md:flex-row justify-evenly w-[90%] mx-auto gap-4 md:gap-8">
        <div className="py-2 flex flex-col gap-2 items-center">
          <span className="text-2xl text-zinc-900 font-[500]">
            Total number of tasks{" "}
          </span>
          <span className="text-blue-700 text-xl font-[300]">
            {tasksState.tasks.length}
          </span>
        </div>
        <div className="py-2 flex flex-col  gap-2 items-center">
          <span className="text-2xl text-zinc-900 font-[500]">
            Average Task Time{" "}
          </span>
          <span className="text-yellow-600 text-xl font-[300]">
            {getAverageTaskTime(tasksState.tasks)}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-[90%] mx-auto">
        <div className="w-full md:w-[80%] py-4 px-8 flex flex-col gap-4 outline outline-1 rounded-md outline-zinc-200">
          <p className="text-2xl font-semibold text-zinc-500">Tasks per week</p>
          <DatePicker />
          <div className="p-2 md:p-8 h-72 w-[100%] outline outline-1 rounded-md outline-zinc-200 bg-blue">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={500} height={300} data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar width={500} height={300} dataKey="count" fill="#6b21a8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-[80%] py-4 px-8 flex flex-col gap-4 outline outline-1 rounded-md outline-zinc-200">
          <p className="text-2xl font-semibold text-zinc-500">Time per day</p>
          <DatePicker />
          <div className="p-2 md:p-8 h-72 w-[100%] outline outline-1 rounded-md outline-zinc-200">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={500} height={300} data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar
                  width={500}
                  height={300}
                  dataKey="totalTime"
                  fill="#f97316"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <TasksByTags />
    </div>
  );
};

export default TasksAnalytics;
