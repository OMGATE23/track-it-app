import { ProjectPriority, ProjectStatus, Resp_Project } from "@/helpers/types";

export type Action ={
      type: "ADD_PROJECT";
      payload: {
        title: string;
        description: string;
        startDate: Date;
        deadline: Date;
        priority : ProjectPriority

      };
    }
  | {
      type: "DELETE_PROJECT";
      payload: {
        id: string;
      };
    }
  | {
      type: "UPDATE_PROJECT";
      payload: {
        title?: string;
        description?: string;
        startDate?: Date;
        deadline?: Date;
        status ?: ProjectStatus;
        priority ?: ProjectPriority
        id : string
      };
    }
  | {
      type: "SET_PROJECTS";
      payload: Resp_Project[];
    }
  | {
      type: "SET_ERROR";
      payload: string;
    }
  | {
    type : "LOADING_COMPLETE";
  } | {
    type : "LOADING"
  }
