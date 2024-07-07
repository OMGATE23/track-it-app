import React, { ChangeEventHandler, useEffect, useState } from "react";
import { CreateTaskType } from "./week-components/WeekGrid";
import DropdownTime from "./DropdownTime";
import { useTaskContext } from "@/context/TaskContext";
import { colourOptions } from "@/helpers/constansts";
type CreateEventModalType = {
  setShowCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  createTaskData: CreateTaskType;
};

type TaskInfo = {
  title: string;
  description: string;
};

const CreateEventModal = ({
  setShowCreateTask,
  createTaskData,
}: CreateEventModalType) => {
  const [taskInfo, setTaskInfo] = useState<TaskInfo>({
    title: "",
    description: "",
  });
  const [startTime, setStartTime] = useState(createTaskData.start);
  const [endTime, setEndTime] = useState(createTaskData.start + 60);
  const [taskDate, setTaskDate] = useState(
    createTaskData.taskDate.toISOString().split("T")[0]
  );

  const [taskColour, setTaskColour] = useState(colourOptions[0]);
  const { taskDispatch } = useTaskContext();
  const handleStartTimeChange = (value: number) => {
    setStartTime(value);
    if (endTime <= value) {
      setEndTime(value + 15);
    }
  };

  const handleEndTimeChange = (value: number) => {
    setEndTime(value);
  };
  const disabledEndTimeOptions: number[] = [];
  for (let i = 0; i <= startTime; i += 15) {
    disabledEndTimeOptions.push(i);
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.closest("#modal")) {
      setShowCreateTask(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0  z-[999999] w-[100%] h-[100vh] flex justify-center items-center">
      <div
        id="modal"
        className="fade-up min-w-[360px] relative z-[9999999] bg-white rounded-lg shadow-xl outline outline-1 outline-zinc-100 py-8 px-8"
      >
        <form className="flex flex-col items-center gap-8 w-[80%] mx-auto">
          <div className="flex flex-col w-full gap-4">
            <input
              className="border-b w-full py-2 focus:outline-none border-zinc-400 "
              type="text"
              required
              autoFocus
              placeholder="Title*"
              onChange={(e) => {
                setTaskInfo((prev) => {
                  return {
                    ...prev,
                    title: e.target.value,
                  };
                });
              }}
            />

            <input
              type="text"
              placeholder="Description"
              className="border-b w-full py-2 focus:outline-none border-zinc-400"
              onChange={(e) => {
                setTaskInfo((prev) => {
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
            />
          </div>
          <input
            type="date"
            onChange={(e) => {
              setTaskDate(e.target.value);
            }}
            value={taskDate}
          />
          <div className="flex items-center gap-4">
            <DropdownTime
              value={startTime}
              changeHandler={handleStartTimeChange}
            />
            to
            <DropdownTime
              value={endTime}
              changeHandler={handleEndTimeChange}
              disabledOptions={disabledEndTimeOptions}
            />
          </div>

          <div className="grid grid-cols-4 justify-items-center gap-4">
            {colourOptions.map((colour) => (
              <label key={colour} className={`w-6 h-6 ${colour}  rounded-lg `}>
                {colour === taskColour && (
                  <span className="text-white h-full flex justify-center items-center">
                    <img
                      className="text-white"
                      width={20}
                      src="/assets/icons/check.svg"
                    />
                  </span>
                )}
                <input
                  className={`w-6 h-6 relative opacity-0`}
                  type="radio"
                  name="colour"
                  onChange={() => setTaskColour(colour)}
                />
              </label>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="submit"
              className={`w-fit py-1 px-6 text-lg ${
                taskInfo.title === ""
                  ? "cursor-not-allowed bg-zinc-200"
                  : "bg-zinc-800"
              } text-white rounded-md`}
              disabled={!taskInfo.title}
              onClick={(e) => {
                e.preventDefault();
                taskDispatch({
                  type: "ADD_TASK",
                  payload: {
                    title: taskInfo.title,
                    description: taskInfo.description,
                    startTime,
                    endTime,
                    date: new Date(taskDate),
                    colour: taskColour,
                  },
                });
                setShowCreateTask(false);
              }}
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowCreateTask(false);
              }}
              className="w-fit py-1 px-6 text-lg outline outline-1 outline-zinc-800 text-zinc-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
