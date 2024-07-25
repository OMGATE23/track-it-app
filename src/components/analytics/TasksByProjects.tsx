import { useProjectsContext } from "@/context/ProjectContext";
import React, { useEffect, useState } from "react";
import ProjectSelector from "../projects/ProjectSelector";
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
import { countAndAvgTasksByDate, getDatesInSameWeek } from "@/helpers/helper";
import { useDateContext } from "@/context/DateContext";
import { useTaskContext } from "@/context/TaskContext";

const TasksByProjects = () => {
  const { projectsState } = useProjectsContext();
  const { tasksState } = useTaskContext();
  const { state: dateState } = useDateContext();
  const [projectId, setProjectId] = useState<string>("");

  let taskData = countAndAvgTasksByDate(
    getDatesInSameWeek(dateState.displayDate),
    tasksState.tasks.filter((t) => t.projectId === projectId)
  );

  useEffect(() => {
    if (projectsState.projects[0]) {
      setProjectId(projectsState.projects[0].id);
    }
  }, [projectsState.projects]);
  return (
    <div className="flex flex-col gap-8 mx-auto w-[90%] mb-16">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <DatePicker />
        <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      </div>
      <div className="h-96 py-2 px-2 md:px-6 outline outline-1 outline-zinc-200 rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={600} height={300} data={taskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar width={500} height={300} dataKey="count" fill="#fbbf24"></Bar>
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
  );
};

export default TasksByProjects;
