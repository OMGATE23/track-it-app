import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { CreateTaskType } from "./week-components/WeekGrid";
import DropdownTime from "./DropdownTime";
import { useTaskContext } from "@/context/TaskContext";
import { colourOptions } from "@/helpers/constansts";
import DatePicker from "./DatePicker";
import TagsSelector from "./TagsSelector";
import { Tag } from "@/helpers/types";
import ProjectSelector from "../projects/ProjectSelector";
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
  const [selectedTags, setSelectedTags] = useState<Array<Tag>>([]);
  const [taskColour, setTaskColour] = useState(colourOptions[0]);
  const { taskDispatch } = useTaskContext();
  const [projectId, setProjectId] = useState<string>("");

  const handleStartTimeChange = (value: number) => {
    setStartTime(value);
    if (endTime <= value) {
      setEndTime(value + 15);
    }
  };
  const componentRef = useRef<HTMLDivElement>(null);

  const handleEndTimeChange = (value: number) => {
    setEndTime(value);
  };
  const disabledEndTimeOptions: number[] = [];
  for (let i = 0; i <= startTime; i += 15) {
    disabledEndTimeOptions.push(i);
  }

  return (
    <div
      ref={componentRef}
      className="fixed top-0 left-0  z-[999999] bg-[rgba(0,0,0,0.2)] w-[100%] h-[100vh] flex justify-center items-center"
    >
      <div
        id="modal"
        className="fade-up w-[90%] md:w-[75%] h-[90%] overflow-y-auto relative z-[9999999] bg-white rounded-lg shadow-xl outline outline-1 outline-zinc-100 py-8 px-2 md:px-8"
      >
        <form className="flex flex-col items-start gap-6 w-[80%] mx-auto">
          <div className="flex flex-col w-full gap-4">
            <input
              className="border-b w-full md:w-[75%] py-2 text-xl focus:outline-none focus:border-blue-400 border-zinc-400"
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
          </div>
          <div className="flex w-full flex-col md:flex-row items-center gap-4">
            <input
              type="date"
              onChange={(e) => {
                setTaskDate(e.target.value);
              }}
              className="py-1 px-2 outline outline-1 outline-zinc-300 rounded-md"
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
          </div>
          <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
          <TagsSelector
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <div className="flex items-start md:items-center justify-items-center gap-4">
            <p>Color:</p>
            <div className="grid md:flex grid-cols-4 gap-4 md:items-center">
              {colourOptions.map((colour) => (
                <label
                  key={colour}
                  className={`w-6 h-6 ${colour} cursor-pointer rounded-lg `}
                >
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
                    className={`w-6 h-6 cursor-pointer relative opacity-0`}
                    type="radio"
                    name="colour"
                    onChange={() => setTaskColour(colour)}
                  />
                </label>
              ))}
            </div>
          </div>
          <textarea
            rows={10}
            placeholder="Description"
            wrap="hard"
            className="bg-zinc-100 font-[300] p-4 rounded-md w-full py-2 focus:outline-none resize-none placeholder:text-zinc-600"
            onChange={(e) => {
              setTaskInfo((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />

          <div className="flex items-center justify-center w-full md:justify-start gap-6">
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
                    tags: selectedTags.map(({ tag, type }) => ({ tag, type })),
                    projectId: projectId,
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
