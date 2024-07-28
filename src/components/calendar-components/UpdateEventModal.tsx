import React, { FormEvent, useEffect, useState } from "react";
import DropdownTime from "./DropdownTime";
import { useTaskContext } from "@/context/TaskContext";
import { colourOptions, TAGS } from "@/helpers/constansts";
import { Tag, Task } from "@/helpers/types";
import TagsSelector from "./TagsSelector";
import { getProcessedSingleTag, getProcessedTags } from "@/helpers/helper";
import ProjectSelector from "../projects/ProjectSelector";
import PrioritySelector from "./PrioritySelector";
import StatusSelector from "./StatusSelector";
type UpdateEventModalType = {
  setShowUpdateTask: React.Dispatch<React.SetStateAction<boolean>>;
  updateTaskData: Task;
};

type TaskInfo = {
  title: string;
  description: string;
};

const UpdateEventModal = ({
  setShowUpdateTask,
  updateTaskData,
}: UpdateEventModalType) => {
  const [taskInfo, setTaskInfo] = useState<TaskInfo>({
    title: updateTaskData.title,
    description: updateTaskData.description as string,
  });
  const [priority, setPriority] = useState<Tag>(
    getProcessedSingleTag(
      updateTaskData.tags.find((t) => t.type === "priority")
    ) || TAGS.priority[0]
  );
  const [status, setStatus] = useState<Tag>(
    getProcessedSingleTag(
      updateTaskData.tags.find((t) => t.type === "status")
    ) || TAGS.status[0]
  );
  const [startTime, setStartTime] = useState(updateTaskData.startTime);
  const [endTime, setEndTime] = useState(updateTaskData.endTime);
  const [taskDate, setTaskDate] = useState(
    updateTaskData.date.toISOString().split("T")[0]
  );
  const [taskColour, setTaskColour] = useState(updateTaskData.colour);
  const [selectedTasks, setSelectedTags] = useState<Array<Tag>>(
    getProcessedTags(
      updateTaskData.tags.filter(
        (tag) => tag.type !== "priority" && tag.type !== "status"
      )
    )
  );
  const [projectId, setProjectId] = useState<string>(updateTaskData.projectId);
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

  async function updateTask(e: FormEvent) {
    e.preventDefault();
    await taskDispatch({
      type: "UPDATE_TASK",
      payload: {
        title: taskInfo.title,
        description: taskInfo.description,
        startTime,
        endTime,
        date: new Date(taskDate),
        colour: taskColour,
        id: updateTaskData.id,
        tags: [
          ...selectedTasks.map(({ tag, type }) => ({ tag, type })),
          { tag: priority.tag, type: priority.type },
          { tag: status.tag, type: status.type },
        ],
        projectId: projectId,
      },
    });
    setShowUpdateTask(false);
  }

  return (
    <div className="fixed top-0 left-0 z-[999999] w-[100%] h-[100vh] bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
      <div
        id="modal"
        className="fade-up w-[90%] md:w-[75%] h-[90%] overflow-y-auto relative min-w-[360px] z-[9999999] bg-white rounded-lg shadow-xl outline outline-1 outline-zinc-100 py-8 px-2 md:px-8"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-start gap-8 w-[80%] mx-auto"
        >
          <div className="flex flex-col items-center md:items-start w-full gap-4">
            <input
              className="border-b w-full md:w-[75%] py-2 text-xl focus:outline-none focus:border-blue-400 border-zinc-400"
              type="text"
              required
              autoFocus
              placeholder="Title*"
              value={taskInfo.title}
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
              value={taskDate}
              className="py-1 px-2 outline outline-1 outline-zinc-300 rounded-md"
            />
            <div className="flex items-center gap-4">
              <DropdownTime
                value={startTime}
                changeHandler={handleStartTimeChange}
              />
              <p>to</p>
              <DropdownTime
                value={endTime}
                changeHandler={handleEndTimeChange}
                disabledOptions={disabledEndTimeOptions}
              />
            </div>
          </div>
          <TagsSelector
            selectedTags={selectedTasks}
            setSelectedTags={setSelectedTags}
          />
          <PrioritySelector priority={priority} setPriority={setPriority} />
          <StatusSelector status={status} setStatus={setStatus} />
          <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
          <div className="flex w-full md:items-center gap-4">
            Color:
            <div className="grid md:flex md:items-center grid-cols-4 gap-4">
              {colourOptions.map((colour) => (
                <label key={colour} className={`w-6 h-6 ${colour} rounded-lg `}>
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
                    checked={colour === taskColour}
                    onChange={() => setTaskColour(colour)}
                  />
                </label>
              ))}
            </div>
          </div>
          <textarea
            rows={10}
            wrap="hard"
            placeholder="Description"
            className="bg-zinc-100 font-[300] p-4 rounded-md w-full py-2 focus:outline-none resize-none placeholder:text-zinc-600"
            value={taskInfo.description}
            onChange={(e) => {
              setTaskInfo((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />
          <div className="flex w-full items-center justify-center md:justify-start gap-6">
            <button
              type="submit"
              className={`w-fit py-1 px-6 text-lg ${
                taskInfo.title === ""
                  ? "cursor-not-allowed bg-zinc-200"
                  : "bg-zinc-800"
              } text-white rounded-md`}
              disabled={!taskInfo.title}
              onClick={updateTask}
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowUpdateTask(false);
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

export default UpdateEventModal;
