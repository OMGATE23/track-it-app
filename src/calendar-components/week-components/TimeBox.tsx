import React from "react";
import { CreateTaskType } from "./WeekGrid";

type TimeBoxProps = {
  timeInterval: {
    start: number;
    end: number;
  };
  day: Date;
  setCreateTaskData: React.Dispatch<React.SetStateAction<CreateTaskType>>;
  setShowCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimeBox = ({
  setCreateTaskData,
  setShowCreateTask,
  timeInterval,
  day,
}: TimeBoxProps) => {
  return (
    <>
      <div
        data-type="timebox"
        onClick={(e) => {
          const nativeElement = e.nativeEvent.target as HTMLElement;
          if (nativeElement.getAttribute("data-type") !== "timebox") {
            return;
          }
          setCreateTaskData({
            taskDate: day,
            start: timeInterval.start,
          });
          setShowCreateTask(true);
        }}
        className={`h-4  timebox ${
          timeInterval.end % 60 === 0 && "border-b-[1px] border-neutral-200 "
        } relative`}
      ></div>
    </>
  );
};

export default TimeBox;
