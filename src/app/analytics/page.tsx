"use client";
import Header from "@/components/Header";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import Sidebar from "@/components/Sidebar";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";
import Footer from "@/components/Footer";

const Analytics = () => {
  const { state } = useAuthContext();
  const router = useRouter();

  if (!state.authIsReady) {
    return <></>;
  }

  if (!state.user) {
    router.push("/");
    return <></>;
  }
  return (
    <div className="min-h-[100vh]">
      <Header />
      <div className="flex">
        <Sidebar />
        <AnalyticsPage />
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;
