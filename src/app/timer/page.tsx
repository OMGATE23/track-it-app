"use client";
import Header from "@/components/Header";
import DisplayView from "@/components/calendar-components/DisplayView";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import LoginPrompt from "@/components/LoginPrompt";

const App = () => {
  const { state } = useAuthContext();
  const router = useRouter();

  if (!state.authIsReady) {
    return <></>;
  }

  if (!state.user) {
    return <LoginPrompt/>;
  }
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="flex">
        <Sidebar />
        <DisplayView />
      </div>
      <Footer />
    </div>
  );
};

export default App;
