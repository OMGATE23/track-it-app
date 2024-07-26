"use client";
import React from "react";
import WeekGrid from "./week-components/WeekGrid";
import DatePicker from "./DatePicker";
import TaskTimer from "./TaskTimer";

const DisplayView = () => {
  return (
    <main className="relative h-[90vh]  overflow-hidden flex flex-col items-center md:items-start justify-stretch p-4 gap-4">
      <TaskTimer />
      <div className="flex relative flex-col gap-8 justify-center items-center">
        <DatePicker />
      </div>
      <div className="outline outline-1 h-[70%] overflow-x-auto  w-[90%] md:w-full md:overflow-x-hidden outline-zinc-100 rounded-sm shadow-sm">
        <WeekGrid />
      </div>
    </main>
  );
};

export default DisplayView;
