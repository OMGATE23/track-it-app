"use client";
import React, { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import {Task} from '../helpers/types'
import { Action } from "./task-context/types";
import useFirestore from "@/hooks/useFirestore";
import { useAuthContext } from "@/hooks/useAuthContext";

export type TaskState = {
  tasks: Task[];
  loading : boolean;
  error? : string;
};

export type TaskContextType = {
  tasksState: TaskState;
  taskDispatch: (action : Action) => Promise<void>;
};

export const TaskContext = createContext<TaskContextType>({
  tasksState: {
    tasks: [],
    loading : true
  },
  taskDispatch: async () => {}
});

export function useTaskContext() {
  return useContext(TaskContext);
}
const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const {addTask , getAllUserTasks , updateTask , deleteTask} = useFirestore()
  const [tasksState, taskDispatch] = useReducer(reducer, {
    tasks: [],
    loading : true
  });
  const {state : userState} = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getAllUserTasks();
      if (!result.errorOccured && result.tasks) {
        taskDispatch({ type: "SET_TASKS", payload: result.tasks });
      } else {
        taskDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
      }
      taskDispatch({ type: "LOADING_COMPLETE" });
    };
    fetchTasks();
  }, [userState.user]);

  function reducer(state: TaskState, action: Action): TaskState {
    switch (action.type) {
      case "SET_TASKS" :  {
        return ({
          ...state,
          tasks : action.payload
        })
      }

      case "SET_ERROR" : {
        return ({
          ...state,
          error : action.payload,
          loading : false
        })
      }

      case "LOADING_COMPLETE" : {
        return ({
          ...state,
          loading : false
        })
      }

      default:
        return state;
    }
  }

  const asyncTaskDispatch = async (action: Action) => {
    switch (action.type) {
      case "ADD_TASK": {
        const { payload: task } = action;
        
        const result = await addTask(task);
        if (!result.isError) {
          const updatedTasksResult = await getAllUserTasks();
          if (!updatedTasksResult.errorOccured && updatedTasksResult.tasks) {
            taskDispatch({ type: "SET_TASKS", payload: updatedTasksResult.tasks });
          } else {
            taskDispatch({ type: "SET_ERROR", payload: updatedTasksResult.error || "Unknown error occurred" });
          }
        } else {
          taskDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
        }
        break;
      }
      case "UPDATE_TASK": {
        const { payload } = action;
        const taskToUpdate = tasksState.tasks.find((task) => task.id === payload.id);
        if(taskToUpdate){
          console.log({...taskToUpdate , ...payload})
          const result = await updateTask({...taskToUpdate , ...payload});
        if (!result.isError) {
          const updatedTasksResult = await getAllUserTasks();
          if (!updatedTasksResult.errorOccured && updatedTasksResult.tasks) {
            taskDispatch({ type: "SET_TASKS", payload: updatedTasksResult.tasks });
          } else {
            taskDispatch({ type: "SET_ERROR", payload: updatedTasksResult.error || "Unknown error occurred" });
          }
        } else {
          taskDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
        }
        }
        break;
      }
      case "DELETE_TASK": {
        const { payload } = action;
        const result = await deleteTask(payload.id)
        if (!result.isError) {
          const updatedTasksResult = await getAllUserTasks();
          if (!updatedTasksResult.errorOccured && updatedTasksResult.tasks) {
            taskDispatch({ type: "SET_TASKS", payload: updatedTasksResult.tasks });
          } else {
            taskDispatch({ type: "SET_ERROR", payload: updatedTasksResult.error || "Unknown error occurred" });
          }
        } else {
          taskDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
        }
        
        break;
      }
      case "UPDATE_TIME": {
        const { id, startTime, endTime } = action.payload;
        const taskToUpdate = tasksState.tasks.find((task) => task.id === id);
        if (taskToUpdate) {
          taskDispatch({ 
            type: "SET_TASKS", 
            payload: [...tasksState.tasks.map(task => {
              if(task.id === id){
                task = {...task , startTime, endTime}
              }
              return task
            })
          ] });
          const result = await updateTask({ ...taskToUpdate, startTime, endTime });
          if (!result.isError) {
            const updatedTasksResult = await getAllUserTasks();
            if (!updatedTasksResult.errorOccured && updatedTasksResult.tasks) {
              taskDispatch({ type: "SET_TASKS", payload: updatedTasksResult.tasks });
            } else {
              taskDispatch({ type: "SET_ERROR", payload: updatedTasksResult.error || "Unknown error occurred" });
            }
          } else {
            taskDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
          }
        }
        break;
      }
      case "UPDATE_DATE": {
        const { id, newDate, startTime, endTime } = action.payload;
        const taskToUpdate = tasksState.tasks.find((task) => task.id === id);
        if (taskToUpdate) {
          taskDispatch({ 
            type: "SET_TASKS", 
            payload: [...tasksState.tasks.map(task => {
              if(task.id === id){
                task = {...task , date: newDate, startTime, endTime}
              }
              return task
            })
          ] });
          const result = await updateTask({ ...taskToUpdate, date: newDate, startTime, endTime });
          if (!result.isError) {
            const updatedTasksResult = await getAllUserTasks();
            if (!updatedTasksResult.errorOccured && updatedTasksResult.tasks) {
              taskDispatch({ type: "SET_TASKS", payload: updatedTasksResult.tasks });
            } else {
              taskDispatch({ type: "SET_ERROR", payload: updatedTasksResult.error || "Unknown error occurred" });
            }
          } else {
            taskDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
          }
        }
        break;
      }
      default:
        break;
    }
  };
  return (
    <TaskContext.Provider value={{ tasksState, taskDispatch : asyncTaskDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
