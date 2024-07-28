import {
  monthDayYearFormatDate,
  priorityStyling,
  statusStyling,
} from "@/helpers/helper";
import { ProjectPriority, ProjectStatus, Resp_Project } from "@/helpers/types";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  projects: Resp_Project[];
}

const ProjectsTable = ({ projects }: Props) => {
  const router = useRouter();

  return (
    <div className="mt-8 w-full max-auto overflow-x-auto">
      <table className="mx-auto w-full">
        <thead className="border-b rounded-md border-zinc-300">
          <tr>
            <th className="py-1 font-normal text-zinc-800">
              <p className="w-[140px]">Project Title</p>
            </th>
            <th className="py-1 font-normal text-zinc-800">
              <p className="w-[160px]">Description</p>
            </th>
            <th className="py-1 font-normal text-zinc-800">
              <p className="w-[160px]">Start Date</p>
            </th>
            <th className="py-1 font-normal text-zinc-800">
              <p className="w-[160px]">Deadline</p>
            </th>
            <th className="py-1 font-normal text-zinc-800">
              <p className="w-[120px]">Priority</p>
            </th>
            <th className="py-1 font-normal text-zinc-800">
              <p className="w-[120px]">Status</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b py-4 my-1 border-zinc-200 hover:bg-zinc-100 cursor-pointer"
              onClick={() => {
                router.push(`/projects/${project.id}`);
              }}
            >
              <td className="py-2 text-center font-[500]">
                {project.title || "(No Title)"}
              </td>
              <td className="py-2 text-ellipsis max-w-[120px] overflow-x-hidden">
                {project.description || "(no description)"}
              </td>
              <td className="py-2 text-center">
                {monthDayYearFormatDate(project.startDate)}
              </td>
              <td className="py-2 text-center">
                {monthDayYearFormatDate(project.deadline)}
              </td>
              <td className="py-2 text-center mx-auto">
                <span
                  className={`${priorityStyling(
                    project.priority
                  )} text-white px-4 py-1 rounded-full`}
                >
                  {project.priority}
                </span>
              </td>
              <td className="py-2 text-center mx-auto">
                <span
                  className={`${statusStyling(
                    project.status
                  )} text-white px-4 py-1 rounded-full`}
                >
                  {project.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
