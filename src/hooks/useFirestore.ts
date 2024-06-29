import { db } from "../firebase/config";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { useContext } from "react";

export default function useFirestore() {
  const { state } = useAuthContext();
  async function addDemo() {
    const {user} = state
    try {
      if (!user) {
        return {
          message: "User not found. Log in to continue",
        };
      }
      const docRef = await addDoc(collection(db, "demo"), {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
        demo : "Yes this is a demo",
        createdAt : new Date()
      });
      console.log(docRef.id)
      return {isError : false , id : docRef.id}
    } catch (e) {
      return {isError : true , error : e}
    }
  }

  return { addDemo };
}
