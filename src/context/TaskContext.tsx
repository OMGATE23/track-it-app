"use client";
import React, { ReactNode, createContext, useContext, useReducer } from "react";
import {Task} from '../helpers/types'
export type TaskState = {
  tasks: Task[];
};

export type TaskContextType = {
  tasksState: TaskState;
  taskDispatch: React.Dispatch<Action>;
};

export type Action =
  | {
      type: "ADD_TASK";
      payload: {
        title: string;
        description?: string;
        date: Date;
        startTime: number;
        endTime: number;
        colour: string;
      };
    }
  | {
      type: "DELETE_TASK";
      payload: {
        id: string;
      };
    }
  | {
      type: "UPDATE_TIME";
      payload: {
        id: string;
        startTime: number;
        endTime: number;
      };
    }
  | {
      type: "UPDATE_DATE";
      payload: {
        id: string;
        newDate: Date;
        oldDate: Date;
        startTime: number;
        endTime: number;
      };
    }
  | {
      type: "UPDATE_COLOUR";
      payload: {
        id: string;
        colour: string;
      };
    }
  | {
      type: "UPDATE_TASK";
      payload: {
        title: string;
        description?: string;
        date: Date;
        startTime: number;
        endTime: number;
        id: string;
        colour: string;
      };
    };

export const TaskContext = createContext<TaskContextType>({
  tasksState: {
    tasks: [],
  },
  taskDispatch: () => {},
});

export function useTaskContext() {
  return useContext(TaskContext);
}
const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasksState, taskDispatch] = useReducer(reducer, {
    tasks: [],
  });

  function reducer(state: TaskState, action: Action): TaskState {
    switch (action.type) {
      case "ADD_TASK": {
        const { payload: task } = action;
        let taskId = crypto.randomUUID();
        let newtasks = [
          ...state.tasks,
          {
            ...task,
            description: task.description || "",
            id: taskId,
            colour: task.colour,
            project : '',
          } as Task,
        ];
        
        return {
          tasks: newtasks,
        };
      }

      case "DELETE_TASK": {
        const { id: toBeDeletedId } = action.payload;

        let newtasks = [...state.tasks];

        newtasks = newtasks.filter((task) => task.id !== toBeDeletedId);

        return {
          tasks: newtasks,
        };
      }

      case "UPDATE_TIME": {
        const { id, startTime, endTime } = action.payload;
        let newTasks = [...state.tasks];

        newTasks = newTasks.map((task) => {
          if (task.id === id) {
            task.startTime = startTime;
            task.endTime = endTime;

            if (endTime <= startTime) {
              task.endTime = task.startTime + 15;
            }
            let timeDiff = endTime - startTime;
            if (task.endTime > 1440) {
              task.endTime = 1440;
              task.startTime = 1440 - timeDiff;
            }
          }
          return task;
        });

        return {
          tasks: newTasks,
        };
      }
      case "UPDATE_DATE": {
        const { id, newDate, startTime, endTime } = action.payload;

        let newTasks = [...state.tasks];

        newTasks = newTasks.map((task) => {
          if (task.id === id) {
            task.date = newDate;
            task.startTime = startTime;
            task.endTime = endTime;

            if (task.endTime > 1440) {
              task.endTime = 1440;
              task.startTime = 1440 - (startTime - endTime);
            }
          }
          return task;
        });

        return {
          tasks: newTasks,
        };
      }

      case "UPDATE_TASK": {
        const { id, date, startTime, endTime, title, description, colour } =
          action.payload;

        let newTasks = [...state.tasks];

        newTasks = newTasks.map((task) => {
          if (task.id === id) {
            task.title = title;
            task.colour = colour;
            task.description = description || "";
            task.date = date;
            task.startTime = startTime;
            task.endTime = endTime;

            if (task.endTime > 1440) {
              task.endTime = 1440;
              task.startTime = 1440 - (startTime - endTime);
            }
          }
          return task;
        });

        return {
          tasks: newTasks,
        };
      }

      default:
        return state;
    }
  }
  return (
    <TaskContext.Provider value={{ tasksState, taskDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
