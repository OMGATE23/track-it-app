import { useTaskContext } from "@/context/TaskContext";
import {
  getProcessedTags,
  monthDayYearFormatDate,
  numberToTime,
} from "@/helpers/helper";
import { Task } from "@/helpers/types";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  task: Task;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}

const TaskInfo = ({ task, setShowInfo, setShowUpdateModal }: Props) => {
  const [showDelete, setShowDelete] = useState(false);
  const { taskDispatch } = useTaskContext();
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh]  text-black z-[999999] flex justify-center items-center">
      <div className=" w-[80vw] mx-auto md:w-[40%] fade-up z-[9999999] bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => {
              setShowInfo(false);
              setShowUpdateModal(true);
            }}
            className="w-6 h-6"
          >
            <img src="/assets/icons/edit.svg" />
          </button>
          <button
            onClick={() => {
              setShowDelete(true);
            }}
            className="w-6 h-6"
          >
            <img src="/assets/icons/delete.svg" />
          </button>
          <button
            onClick={() => {
              setShowInfo(false);
            }}
            className="w-6 h-6"
          >
            <img className="text-black" src="/assets/icons/close.svg" />
          </button>
        </div>
        <div className=" flex flex-col gap-2   py-4 px-8">
          <p className="text-2xl font-semibold">{task.title}</p>
          <p className="text-sm">{monthDayYearFormatDate(task.date)}</p>
          <p className="text-sm">
            {numberToTime(task.startTime)} to {numberToTime(task.endTime)}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {getProcessedTags(task.tags || []).map((tag) => (
              <span
                key={tag.type + tag.type}
                className={`rounded-full px-3 py-1 ${tag.background} text-white`}
              >
                {tag.tag}
              </span>
            ))}
          </div>
          <p>{task.description}</p>
        </div>
      </div>
      {showDelete && (
        <div className="absolute fade-up-delete-modal shadow-2xl md:w-[30%] fade-up z-[9999999] bg-white px-8 py-6 rounded-md  flex flex-col gap-4">
          Are you sure you want to delete the task?
          <div className="flex items-center gap-4 justify-end">
            <button
              onClick={() => {
                setShowDelete(false);
              }}
              className="py-1 px-4 rounded-md outline outline-1"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                taskDispatch({
                  type: "DELETE_TASK",
                  payload: { id: task.id },
                });
                setShowDelete(false);
                setShowInfo(false);
              }}
              className="py-1 px-4 rounded-md bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInfo;
