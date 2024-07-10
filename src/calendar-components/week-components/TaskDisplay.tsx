import { useTaskContext } from "@/context/TaskContext";
import { useEffect, useRef, useReducer, useState } from "react";
import { StructuredTaskType } from "./DayView";
import { numberToTime } from "@/helpers/timefunctions";
import { Task, TaskDimensions, TypeDimensionAction } from "@/helpers/types";
import UpdateEventModal from "../UpdateEventModal";

const initialState: TaskDimensions = {
  top: 0,
  left: 0,
  previousClientY: 0,
  previousClientX: 0,
  isMouseMoving: false,
  sliderY: 0,
  addedHeight: 0,
  isSliderMoving: false,
  isMouseUp: false,
};

const reducer = (
  state: TaskDimensions,
  action: TypeDimensionAction
): TaskDimensions => {
  switch (action.type) {
    case "SET_TOP":
      return { ...state, top: action.payload };
    case "SET_LEFT":
      return { ...state, left: action.payload };
    case "SET_PREVIOUS_CLIENT_Y":
      return { ...state, previousClientY: action.payload };
    case "SET_PREVIOUS_CLIENT_X":
      return { ...state, previousClientX: action.payload };
    case "SET_MOUSE_MOVING":
      return { ...state, isMouseMoving: action.payload };
    case "SET_SLIDER_Y":
      return { ...state, sliderY: action.payload };
    case "SET_ADDED_HEIGHT":
      return { ...state, addedHeight: action.payload };
    case "SET_SLIDER_MOVING":
      return { ...state, isSliderMoving: action.payload };
    case "SET_MOUSE_UP":
      return { ...state, isMouseUp: action.payload };
    default:
      return state;
  }
};

const TaskDisplay = ({
  task,
  dayNumber,
  setShowUpdateTask,
  setUpdateTaskData
}: {
  task: StructuredTaskType;
  dayNumber: number;
  setShowUpdateTask : React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateTaskData : React.Dispatch<React.SetStateAction<Task | undefined>>
}) => {
  const refDrag = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, dispatch]: [
    TaskDimensions,
    React.Dispatch<TypeDimensionAction>
  ] = useReducer(reducer, {
    ...initialState,
    top: task.startTime,
  });
  const { taskDispatch } = useTaskContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        dispatch({ type: "SET_MOUSE_MOVING", payload: false });
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_ADDED_HEIGHT", payload: 0 });
  }, [task.endTime]);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    dispatch({ type: "SET_MOUSE_MOVING", payload: true });
    dispatch({ type: "SET_PREVIOUS_CLIENT_Y", payload: event.clientY });
    dispatch({ type: "SET_PREVIOUS_CLIENT_X", payload: event.clientX });
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (state.isMouseMoving) {
      const dy = event.clientY - state.previousClientY;
      const dx = event.clientX - state.previousClientX;
      dispatch({ type: "SET_TOP", payload: Math.max(task.startTime + dy, 0) });
      dispatch({
        type: "SET_LEFT",
        payload: Math.min(
          Math.max(dx, -dayNumber * 128),
          (6 - dayNumber) * 128
        ),
      });
    }
  };

  const handleMouseUp = () => {
    dispatch({ type: "SET_MOUSE_MOVING", payload: false });
    if (state.left === 0 && state.top === task.startTime) {
      setShowUpdateTask(true)
      setUpdateTaskData(task)
      return;
    }
    
    let newTop = Math.floor(state.top / 15) * 15;
    let dateOffset = 0;
    if (Math.abs(state.left) > 64) {
      dateOffset =
        state.left < 0
          ? 0.5 * Math.floor(state.left / 64)
          : 0.5 * Math.ceil(state.left / 64);
    }
    if (dateOffset !== 0) {
      let newDate = new Date(task.date);
      newDate.setDate(newDate.getDate() + dateOffset);
      if(ref.current) ref.current.style.display = 'none'
      taskDispatch({
        type: "UPDATE_DATE",
        payload: {
          id: task.id,
          startTime: newTop,
          endTime: task.endTime - task.startTime + newTop,
          newDate: newDate,
        },
      });
      
    } else {
      taskDispatch({
        type: "UPDATE_TIME",
        payload: {
          id: task.id,
          startTime: newTop,
          endTime: task.endTime - task.startTime + newTop,
        },
      });
    }
    dispatch({ type: "SET_TOP", payload: newTop });
    dispatch({ type: "SET_LEFT", payload: 0 });
  };

  const handleSliderMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    dispatch({ type: "SET_SLIDER_MOVING", payload: true });
    dispatch({ type: "SET_SLIDER_Y", payload: event.clientY });
  };

  const handleSliderMouseMove: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (state.isSliderMoving) {
      const dy = event.clientY - state.sliderY;
      dispatch({ type: "SET_ADDED_HEIGHT", payload: dy });
    }
  };

  const handleSliderMouseUp = () => {
    let addedMinutes = Math.floor(state.addedHeight / 15) * 15;
    taskDispatch({
      type: "UPDATE_TIME",
      payload: {
        id: task.id,
        startTime: task.startTime,
        endTime: task.endTime + addedMinutes,
      },
    });
    dispatch({ type: "SET_SLIDER_MOVING", payload: false });
  };

  const handleSliderMouseLeave = () => {
    if (!state.isSliderMoving) return;
    let addedMinutes = Math.floor(state.addedHeight / 15) * 15;
    taskDispatch({
      type: "UPDATE_TIME",
      payload: {
        id: task.id,
        startTime: task.startTime,
        endTime: task.endTime + addedMinutes,
      },
    });
    dispatch({ type: "SET_SLIDER_MOVING", payload: false });
  };

  return (
    <div
      id={task.id}
      ref={ref}
      className={` resizeable ${task.colour} rounded-md`}
      style={{
        position: "absolute",
        top: state.top * (16 / 15) + "px",
        height: `${
          ((task.endTime - task.startTime) * 16) / 15 + state.addedHeight
        }px`,
        marginLeft:
          state.isMouseMoving || state.isSliderMoving
            ? "0px"
            : `${task.hallNumber * 20}px`,
        left: state.left + "px",
        width:
          state.isMouseMoving || state.isSliderMoving
            ? "100%"
            : `calc(80% - ${task.hallNumber * 20}px)`,
        zIndex: state.isMouseMoving || state.isSliderMoving ? 20 : 10,
        display: state.isMouseUp ? "none" : "block",
        outline : task.hallNumber > 0 ? "1px solid white" : ""
      }}
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        ref={refDrag}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        id="content"
        className="text-xs font-[500] p-1 relative rounded-md h-full w-full shadow-xl text-white"
      >
        <div className="overflow-hidden select-none h-full cursor-pointer">
          <p className="text-clip">{task.title}</p>
          <p className="text-clip">
            {numberToTime(task.startTime)} - {numberToTime(task.endTime)}
          </p>
        </div>
        {state.isMouseMoving && (
          <div className="h-[100vh] w-[300%] translate-y-[-50%] translate-x-[-33%] absolute top-0 left-0"></div>
        )}
      </div>
      <div
        className="resizer-b rounded-b-md"
        style={{ height: "4px" }}
        onMouseDown={handleSliderMouseDown}
        onMouseMove={handleSliderMouseMove}
        onMouseUp={handleSliderMouseUp}
        onMouseLeave={handleSliderMouseLeave}
      >
        {state.isSliderMoving && (
          <div className="h-[100px] relative translate-y-[-50%]"></div>
        )}
      </div>
    </div>
  );
};
export default TaskDisplay;
