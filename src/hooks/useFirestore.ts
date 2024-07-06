import { db } from "../firebase/config";
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { Task } from "@/helpers/types";

export default function useFirestore() {
  const { state } = useAuthContext();

  async function addTask(task: Task): Promise<{ isError: boolean; id?: string; error?: any }> {
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
      console.log('Task added');
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
        tasks.push({ id: doc.id, ...doc.data() } as Task);
      });
      console.log(tasks);
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
        title: task.title,
        description: task.description,
        date: task.date,
        startTime: task.startTime,
        endTime: task.endTime,
        colour: task.colour,
      });
      console.log('Task updated');
      return { isError: false };
    } catch (error: any) {
      console.error("Error updating task:", error);
      return { isError: true, error };
    }
  }

  return { addTask , getAllUserTasks , updateTask};
};