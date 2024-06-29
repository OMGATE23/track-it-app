import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);
  const router = useRouter()

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user_id");
    router.push('/')
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, logout };
}