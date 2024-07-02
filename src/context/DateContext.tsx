"use client";
import React, { ReactNode, createContext, useContext, useReducer } from "react";

export type DateContext = {
  state: {
    selectedDate: Date;
    displayDate: Date;
  };
  dispatch: React.Dispatch<Action>;
};

export type DateState = {
  selectedDate: Date;
  displayDate: Date;
};

export type Action = {
  type: string;
  payload: {
    selectedDate?: Date;
    displayDate?: Date;
  };
};
const DateContext = createContext<DateContext>({
  state: {
    selectedDate: new Date(),
    displayDate: new Date(),
  },
  dispatch: () => {},
});

export function useDateContext() {
  return useContext(DateContext);
}

const DateContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedDate: new Date(),
    displayDate: new Date(),
  });

  function reducer(state: DateState, action: Action): DateState {
    switch (action.type) {
      case "SELECTED_DATE": {
        if (!action.payload.selectedDate) {
          return state;
        }
        return {
          displayDate: action.payload.selectedDate,
          selectedDate: action.payload.selectedDate,
        };
      }
      case "DISPLAY_DATE": {
        if (!action.payload.displayDate) {
          return state;
        }
        return { ...state, displayDate: action.payload.displayDate };
      }
      default:
        return state;
    }
  }
  return (
    <DateContext.Provider value={{ state, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
