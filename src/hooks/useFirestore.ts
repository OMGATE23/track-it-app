import { db } from "../firebase/config";
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getDocs, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { IProject, Resp_Project, Task } from "@/helpers/types";
import { Action } from "@/context/task-context/types";

type ADD_TASK = {
    title: string;
    description?: string;
    date: Date;
    startTime: number;
    endTime: number;
    colour: string;
    projectId : string
  };


export default function useFirestore() {
  const { state } = useAuthContext();

  async function addTask(task : ADD_TASK): Promise<{ isError: boolean; id?: string; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        isError: true,
        error: "User not found. Log in to continue",
      };
    }
  
    try {
      const docRef: DocumentReference = await addDoc(collection(db, "tasks"), {
        ...task,
        userId: user.uid,
      });
      return { isError: false, id: docRef.id };
    } catch (error: any) {
      console.error("Error adding task:", error);
      return { isError: true, error };
    }
  }

  async function getAllUserTasks(): Promise<{ tasks?: Task[]; errorOccured?: boolean; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        errorOccured: true,
        error: "User not found. Log in to continue",
      };
    }
  
    try {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const querySnapshot: QuerySnapshot = await getDocs(q);
      const tasks: Task[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        tasks.push({ id: doc.id, ...doc.data() , date : doc.data().date.toDate() } as Task);
      });
      return { tasks };
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      return { errorOccured: true, error };
    }
  }

  async function updateTask(task: Task): Promise<{ isError: boolean; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        isError: true,
        error: "User not found. Log in to continue",
      };
    }
  
    if (!task.id) {
      return {
        isError: true,
        error: "Task ID is required to update a task",
      };
    }
  
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        ...task
      });
      return { isError: false };
    } catch (error: any) {
      console.error("Error updating task:", error);
      return { isError: true, error };
    }
  }
  async function deleteTask(taskId : string): Promise<{ isError: boolean; message ?: string ; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        isError: true,
        error: "User not found. Log in to continue",
      };
    }
  
    try {
      await deleteDoc(doc(db , "tasks" ,taskId))
      return { isError: false , message  :"Task Deleted Successfully"};
    } catch (error: any) {
      console.error("Error adding task:", error);
      return { isError: true, error };
    }
  }

  async function getAllUserProjects(): Promise<{ projects?: Resp_Project[]; errorOccured?: boolean; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        errorOccured: true,
        error: "User not found. Log in to continue",
      };
    }
  
    try {
      const q = query(collection(db, "projects"), where("userId", "==", user.uid));
      const querySnapshot: QuerySnapshot = await getDocs(q);
      const projects: Resp_Project[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        projects.push({ id: doc.id, ...doc.data() , startDate : doc.data().startDate.toDate(), deadline : doc.data().deadline.toDate() } as Resp_Project);
      });
      return { projects };
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      return { errorOccured: true, error };
    }
  }

  async function addProject(project : IProject): Promise<{ isError: boolean; id?: string; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        isError: true,
        error: "User not found. Log in to continue",
      };
    }
  
    try {
      const docRef: DocumentReference = await addDoc(collection(db, "projects"), {
        ...project,
        userId: user.uid,
      });
      return { isError: false, id: docRef.id };
    } catch (error: any) {
      console.error("Error adding project:", error);
      return { isError: true, error };
    }
  }

  async function updateProject(project: Resp_Project): Promise<{ isError: boolean; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        isError: true,
        error: "User not found. Log in to continue",
      };
    }
  
    if (!project.id) {
      return {
        isError: true,
        error: "project ID is required to update a project",
      };
    }
  
    try {
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, {...project});
      return { isError: false };
    } catch (error: any) {
      console.error("Error updating project:", error);
      return { isError: true, error };
    }
  }

  async function deleteProject(projectId : string): Promise<{ isError: boolean; message ?: string ; error?: any }> {
    const { user } = state;
    if (!user) {
      return {
        isError: true,
        error: "User not found. Log in to continue",
      };
    }
  
    try {
      await deleteDoc(doc(db , "projects" ,projectId))
      return { isError: false , message  :"project Deleted Successfully"};
    } catch (error: any) {
      console.error("Error adding project:", error);
      return { isError: true, error };
    }
  }

  return { addTask , getAllUserTasks , updateTask , deleteTask , getAllUserProjects , addProject , updateProject , deleteProject};
};