"use client";
import React from "react";
import WeekGrid from "./week-components/WeekGrid";
import Calendar from "./Calendar";


const DisplayView = () => {
  
  return (
    <main className="relative  flex flex-col items-center md:items-start justify-stretch p-4 gap-4">
      <div className="flex relative flex-col gap-8 justify-center items-center">
          <Calendar />
        </div>
    <div className="outline outline-1 outline-neutral-200 rounded-md">
      <WeekGrid />
    </div>
    </main>
  );
};

export default DisplayView;
