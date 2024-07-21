import { Resp_Tag, Tag, Task } from "@/helpers/types";

export type TaskState = {
    tasks: Task[];
  };
  
export type Action ={
      type: "ADD_TASK";
      payload: {
        title: string;
        description?: string;
        date: Date;
        startTime: number;
        endTime: number;
        colour: string;
        tags : Resp_Tag[];
        projectId : string
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
        tags : Resp_Tag[];
        projectId : string
      };
    }
  | {
      type: "SET_TASKS";
      payload: Task[];
    }
  | {
      type: "SET_ERROR";
      payload: string;
    }
  | {
    type : "LOADING_COMPLETE";
  } 
