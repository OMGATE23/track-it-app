import { useTaskContext } from "@/context/TaskContext";
import { colourOptions } from "@/helpers/constansts";
import { monthDayYearFormatDate, numberToTime } from "@/helpers/helper";
import React, { Dispatch, SetStateAction, useState } from "react";
import TagsSelector from "./TagsSelector";
import { Tag } from "@/helpers/types";
import ProjectSelector from "../projects/ProjectSelector";

interface Props {
  title: string;
  projectId: string;
  startTime: number;
  endTime: number;
  date: Date;
  setShow: Dispatch<SetStateAction<boolean>>;
  doneCleanUp: () => void;
}

const TimerTaskCreateModal = (props: Props) => {
  const { taskDispatch } = useTaskContext();
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState("");
  const [taskColour, setTaskColour] = useState(colourOptions[0]);
  const [projectId, setProjectId] = useState(props.projectId);
  const [selectedTags, setSelectedTags] = useState<Array<Tag>>([]);
  return (
    <div className="fixed top-0 left-0  z-[999999] bg-[rgba(0,0,0,0.2)] w-[100%] h-[100vh] flex justify-center items-center">
      <div
        id="modal"
        className="fade-up w-[90%] md:max-w-[75%] max-h-[90%] relative z-[9999999] bg-white rounded-lg shadow-xl outline outline-1 outline-zinc-100 py-8 px-8"
      >
        <div className="flex flex-col gap-4 p-4">
          <input
            className="border-b w-[75%]  text-xl focus:outline-none focus:border-blue-400 border-zinc-400"
            type="text"
            required
            autoFocus
            placeholder="Title*"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p className="flex items-center gap-2">
            <span className="font-semibold">
              {numberToTime(props.startTime)}
            </span>
            <span>to</span>
            <span className="font-semibold">{numberToTime(props.endTime)}</span>
          </p>
          <p>{monthDayYearFormatDate(props.date)}</p>
          <TagsSelector
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
          <div className="flex md:items-center justify-items-center gap-4">
            <p>Color:</p>
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
            placeholder="Description"
            wrap="hard"
            className="bg-zinc-100 font-[300] p-4 rounded-md w-full py-2 focus:outline-none resize-none placeholder:text-zinc-600"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="flex items-center justify-end px-4 gap-6">
          <button
            type="submit"
            className={`w-fit py-1 px-6 text-lg 
            bg-zinc-800 text-white rounded-md`}
            onClick={(e) => {
              e.preventDefault();
              taskDispatch({
                type: "ADD_TASK",
                payload: {
                  title: title,
                  description: description,
                  startTime: props.startTime,
                  endTime: props.endTime,
                  date: new Date(props.date),
                  colour: taskColour,
                  tags: selectedTags.map(({ tag, type }) => ({ tag, type })),
                  projectId: projectId,
                },
              });
              props.doneCleanUp();
              props.setShow(false);
            }}
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setShow(false);
            }}
            className="w-fit py-1 px-6 text-lg outline outline-1 outline-zinc-800 text-zinc-800 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerTaskCreateModal;
