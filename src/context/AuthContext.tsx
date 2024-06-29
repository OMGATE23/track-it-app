'use client'
import { ReactNode, createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";
import { User } from "firebase/auth";

type Action =  {
    type : 'LOGIN',
    payload : User
} | {
   type : 'LOGOUT', 
} | {
    type : 'AUTH_IS_READY',
    payload : User | null
}
type State = {
  user: User | null;
  authIsReady: boolean;
};

type UserContext = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const AuthContext = createContext<UserContext>({
  state: {
    user: null,
    authIsReady: false,
  },
  dispatch: () => {},
});

export function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      if (!action.payload) {
        return state;
      }
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload || null, authIsReady: true };
    default:
      return state;
  }
}

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({
        type: "AUTH_IS_READY",
        payload: user,
      });

      unsub();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}