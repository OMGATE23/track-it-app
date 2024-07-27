import { premadeProjects } from "@/helpers/projects";
import { P_AI_Task, ProjectPriority } from "@/helpers/types";
import React, { useState } from "react";
import TaskTimeline from "./TaskTimeline";
import { useDateContext } from "@/context/DateContext";
import { useProjectsContext } from "@/context/ProjectContext";
import { colourOptions } from "@/helpers/constansts";
import { useTaskContext } from "@/context/TaskContext";
import { useRouter } from "next/navigation";

interface PremadeProject {
  title: string;
  description: string;
  tasks: Omit<P_AI_Task, "date">[];
}

const ErrorHandler = () => {
  const [currentProject, setCurrentProject] = useState<PremadeProject | null>(
    null
  );
  const { state: dateState } = useDateContext();
  const { projectsDispatch } = useProjectsContext();
  const { taskDispatch } = useTaskContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  async function addTasksToTimer(tasks: P_AI_Task[]) {
    setLoading(true)
    const projectId = await projectsDispatch({
      type: "ADD_PROJECT",
      payload: {
        title: currentProject!.title,
        description: currentProject!.description,
        startDate: new Date(Date.now()),
        deadline: new Date(
          new Date(Date.now()).getTime() + 7 * 24 * 60 * 60 * 1000
        ),
        priority: ProjectPriority.Low,
      },
    });
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        await taskDispatch({
          type: "ADD_TASK",
          payload: {
            title: tasks[i].title,
            description: tasks[i].description,
            date: new Date(tasks[i].date),
            startTime: tasks[i].startTime,
            endTime: tasks[i].endTime,
            tags: [],
            colour: colourOptions[0],
            projectId: projectId || "none",
          },
        });
      }
      setLoading(false)
      if (projectId) {
        router.push(`/projects/${projectId}`);
      } else {
        router.push("/projects");
      }
    }
  }
  return (
    <div className="flex flex-col items-center gap-4 bg-green">
      <h2 className="text-center text-2xl text-zinc-900 font-semibold">
        Welp! We are out of API credits!
      </h2>
      <p className="text-center text-zinc-700">
        By the time we fix this issue, take a look at the following projects to
        start with!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] md:w-[60%] gap-6">
        {premadeProjects.map((project, i) => (
          <div
            onClick={() => {
              const element = document.getElementById("premade-project");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollBy({ top: 560, behavior: 'smooth' });
              }
              setCurrentProject(project);
            }}
            key={project.title}
            className={` bg-white
                outline outline-1 outline-zinc-400 py-2 px-4 rounded-md hover:cursor-pointer
                premade-project-${i + 1}
            `}
          >
            <p>{project.title}</p>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      {currentProject && (
        <div id="premade-project" className="mt-12 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-zinc-800 font-semibold">
              {currentProject.title}
            </p>
            <p className=" text-zinc-700">{currentProject.description}</p>
          </div>
          <TaskTimeline
            tasks={currentProject.tasks.map((task, index) => {
              const taskDate = new Date();
              taskDate.setDate(taskDate.getDate() + index);
              return {
                ...task,
                date: taskDate,
              };
            })}
          />
          <button
            disabled={loading}
            onClick={() => {
              addTasksToTimer(
                currentProject.tasks.map((task, index) => {
                  const taskDate = new Date();
                  taskDate.setDate(taskDate.getDate() + index);
                  return {
                    ...task,
                    date: taskDate,
                  };
                })
              );
            }}
            className="py-2 px-4 w-fit mx-auto text-white disabled:bg-zinc-500 bg-zinc-900 hover:bg-zinc-950 transition-all duration-200 rounded-md"
          >
            Add to Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorHandler;
