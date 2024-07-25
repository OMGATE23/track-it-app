"use client";
import { useProjectsContext } from "@/context/ProjectContext";
import { useTaskContext } from "@/context/TaskContext";
import { summarizeProjects } from "@/helpers/helper";
import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import DatePicker from "../calendar-components/DatePicker";
import TasksByProjects from "./TasksByProjects";

const ProjectsAnalysis = () => {
  const { projectsState } = useProjectsContext();
  const { tasksState } = useTaskContext();

  const projectsSummary = summarizeProjects(
    tasksState.tasks,
    projectsState.projects
  );
  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="mx-auto text-3xl font-semibold text-zinc-800 text-center w-[90%]">
        Projects Analysis
      </h2>
      <div className="mx-auto flex justify-evenly w-[90%] gap-8">
        <div className="py-2 flex flex-col gap-2 items-center">
          <span className="text-2xl text-zinc-900 font-[500]">
            Total number of projects{" "}
          </span>
          <span className="text-blue-700 text-xl font-[300]">
            {projectsState.projects.length}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-[90%] mx-auto">
        <div className="w-full mx-auto md:w-[80%] py-4 px-8 flex flex-col gap-4 outline outline-1 rounded-md outline-zinc-200">
          <p className="text-2xl font-semibold text-zinc-500">
            Projects by Tasks
          </p>
          <DatePicker />
          <div className="p-8 h-72 w-[100%] outline outline-1 rounded-md outline-zinc-200 bg-blue">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={500} height={400}>
                <Tooltip />
                <Pie
                  data={projectsSummary}
                  dataKey="count"
                  nameKey="project"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#059669"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full mx-auto md:w-[80%] py-4 px-8 flex flex-col gap-4 outline outline-1 rounded-md outline-zinc-200">
          <p className="text-2xl font-semibold text-zinc-500">
            Projects by Time
          </p>
          <DatePicker />
          <div className="p-8 h-72 w-[100%] outline outline-1 rounded-md outline-zinc-200">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={500} height={400}>
                <Tooltip />
                <Pie
                  data={projectsSummary}
                  dataKey="totalTime"
                  nameKey="project"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#7c3aed"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <TasksByProjects />
    </div>
  );
};

export default ProjectsAnalysis;
