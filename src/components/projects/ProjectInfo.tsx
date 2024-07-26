import {
  countAndAvgTasksByDate,
  getDatesInSameWeek,
  monthDayYearFormatDate,
  priorityStyling,
  statusStyling,
} from "@/helpers/helper";
import { Resp_Project } from "@/helpers/types";
import React, { useState } from "react";
import TaskTimeline from "../ai/TaskTimeline";
import { useTaskContext } from "@/context/TaskContext";
import ProjectsTasksTimeline from "./ProjectsTasksTimeline";
import EditIcon from "../icons/Edit";
import EditProject from "./EditProject";
import DatePicker from "../calendar-components/DatePicker";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDateContext } from "@/context/DateContext";

interface Props {
  project: Resp_Project;
}

const ProjectInfo = ({ project }: Props) => {
  const { tasksState } = useTaskContext();
  const [showModal, setShowModal] = useState(false);
  const { state: dateState } = useDateContext();

  let taskData = countAndAvgTasksByDate(
    getDatesInSameWeek(dateState.displayDate),
    tasksState.tasks.filter((t) => t.projectId === project.id)
  );
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full mx-8">
      <div className="flex flex-col mx-auto items-center md:items-start gap-2  rounded-md md:ml-4 py-4 md:px-8">
        <div className="flex items-center gap-6">
          <p className="text-2xl font-semibold">{project.title}</p>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="flex items-center gap-1 text-sm outline outline-1 rounded-md py-0.5 px-2"
          >
            <EditIcon className="size-5" /> Edit
          </button>
        </div>
        <p className="text-zinc-800 text-lg max-w-[560px]">
          {project.description}
        </p>
        <div>
          <div className="flex items-center gap-2">
            Started on
            <span className="text-green-700">
              {monthDayYearFormatDate(new Date(project.startDate))}
            </span>
          </div>
          <div className="flex items-center gap-2">
            Deadline is
            <span className="text-orange-500">
              {monthDayYearFormatDate(new Date(project.deadline))}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 my-2">
          <div className="flex gap-2 items-center">
            <span>Status</span>
            <span
              className={`${statusStyling(
                project.status
              )} text-white px-4 py-[2px] rounded-full`}
            >
              {project.status}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Priority</span>
            <span
              className={`${priorityStyling(
                project.priority
              )} text-white px-4 py-[2px] rounded-full`}
            >
              {project.priority}
            </span>
          </div>
        </div>
        <div className="mx-4 my-12">
          <ProjectsTasksTimeline
            tasks={tasksState.tasks.filter((t) => t.projectId === project.id)}
          />
        </div>
        {showModal && <EditProject setShow={setShowModal} project={project} />}
      </div>
      <div className="flex flex-col gap-8 mx-auto w-[90%] mb-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-[500] text-xl">Tasks per day</h2>
          <DatePicker />
        </div>
        <div className="h-96 w-full py-2 px-2 md:px-6 outline outline-1 outline-zinc-200 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={600} height={300} data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar
                width={500}
                height={300}
                dataKey="count"
                fill="#fbbf24"
              ></Bar>
              <Bar
                width={500}
                height={300}
                dataKey="totalTime"
                fill="#1e40af"
              ></Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
