"use client";
import React, { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import {IProject, ProjectStatus, Resp_Project} from '../helpers/types'
import { Action } from "./project-context-types/type";
import useFirestore from "@/hooks/useFirestore";
import { useAuthContext } from "@/hooks/useAuthContext";

export type ProjectsState = {
  projects : Resp_Project[]
  loading : boolean;
  error? : string;
};

export type ProjectsContextType = {
  projectsState: ProjectsState;
  projectsDispatch: (action : Action) => Promise<any>;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projectsState: {
    projects: [],
    loading : true
  },
  projectsDispatch: async () => {}
});

export function useProjectsContext() {
  return useContext(ProjectsContext);
}
const ProjectsContextProvider = ({ children }: { children: ReactNode }) => {
  const {addProject , updateProject , deleteProject , getAllUserProjects} = useFirestore()
  const [projectsState, projectsDispatch] = useReducer(reducer, {
    projects: [],
    loading : true
  });
  const {state : userState} = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      projectsDispatch({type : 'LOADING'})
      const result = await getAllUserProjects();
      if (!result.errorOccured && result.projects) {
        projectsDispatch({ type: "SET_PROJECTS", payload: result.projects });
        projectsDispatch({type : "SET_ERROR", payload : ''})
      } else {
        projectsDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
      }
      projectsDispatch({ type: "LOADING_COMPLETE" });
    };
    fetchTasks();
  }, [userState.user]);

  function reducer(state: ProjectsState, action: Action): ProjectsState {
    switch (action.type) {
      case "SET_PROJECTS" :  {
        return ({
          ...state,
          projects : action.payload
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

      case "LOADING" : {
        return ({
          ...state,
          loading : true
        })
      }

      default:
        return state;
    }
  }

  const asyncProjectsDispatch = async (action: Action) => {
    switch (action.type) {
      case "ADD_PROJECT": {
        const { payload: project } = action;
        
        const result = await addProject({...project , status : ProjectStatus.Active} as IProject);
        if (!result.isError) {
          const updatedProjectsResult = await getAllUserProjects();
          if (!updatedProjectsResult.errorOccured && updatedProjectsResult.projects) {
            projectsDispatch({ type: "SET_PROJECTS", payload: updatedProjectsResult.projects });
          } else {
            projectsDispatch({ type: "SET_ERROR", payload: updatedProjectsResult.error || "Unknown error occurred" });
          }
          return result.id
        } else {
          projectsDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
        }
        break;
        
      }
      case "UPDATE_PROJECT": {
        const { payload } = action;
        const projectToUpdate = projectsState.projects.find((task) => task.id === payload.id);
        if(projectToUpdate){
          const result = await updateProject({...projectToUpdate , ...payload});
        if (!result.isError) {
          const updatedProjectsResult = await getAllUserProjects();
          if (!updatedProjectsResult.errorOccured && updatedProjectsResult.projects) {
            projectsDispatch({ type: "SET_PROJECTS", payload: updatedProjectsResult.projects });
          } else {
            projectsDispatch({ type: "SET_ERROR", payload: updatedProjectsResult.error || "Unknown error occurred" });
          }
        } else {
          projectsDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
        }
        }
        break;
      }
      case "DELETE_PROJECT": {
        const { payload } = action;
        const result = await deleteProject(payload.id)
        if (!result.isError) {
          const updatedProjectsResult = await getAllUserProjects();
          if (!updatedProjectsResult.errorOccured && updatedProjectsResult.projects) {
            projectsDispatch({ type: "SET_PROJECTS", payload: updatedProjectsResult.projects });
          } else {
            projectsDispatch({ type: "SET_ERROR", payload: updatedProjectsResult.error || "Unknown error occurred" });
          }
        } else {
          projectsDispatch({ type: "SET_ERROR", payload: result.error || "Unknown error occurred" });
        }
        
        break;
      }
      default:
        break;
    }
  };
  return (
    <ProjectsContext.Provider value={{ projectsState, projectsDispatch : asyncProjectsDispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
