"use client";
import React from "react";
import TasksAnalytics from "./TasksAnalytics";
import ProjectsAnalysis from "./ProjectsAnalysis";

const AnalyticsPage = () => {
  return (
    <div className="w-full flex flex-col gap-12">
      <TasksAnalytics />
      <ProjectsAnalysis />
    </div>
  );
};

export default AnalyticsPage;
