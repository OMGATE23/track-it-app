"use client";
import React from "react";
import WeekGrid from "./week-components/WeekGrid";
import Calendar from "./Calendar";
import DatePicker from "./DatePicker";
import useFirestore from "@/hooks/useFirestore";


const DisplayView = () => {
  return (
    <main className="relative h-[90vh]  overflow-hidden  flex flex-col items-center md:items-start justify-stretch p-4 gap-4">
      <div className="flex relative flex-col gap-8 justify-center items-center">
          {/* <Calendar /> */}
          <DatePicker/>
        </div>
      <div className="outline outline-1 h-[70%] outline-zinc-100 rounded-sm shadow-sm">
        <WeekGrid />
      </div>
    </main>
  );
};

export default DisplayView;
