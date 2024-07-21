import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/AuthContext";
import DateContextProvider from "@/context/DateContext";
import TaskContextProvider from "@/context/TaskContext";
import ProjectsContextProvider from "@/context/ProjectContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrackIt",
  description: "Manage your tasks and track your progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <DateContextProvider>
          <ProjectsContextProvider>
            <TaskContextProvider>
              <body className={inter.className}>{children}</body>
            </TaskContextProvider>
          </ProjectsContextProvider>
        </DateContextProvider>
      </AuthContextProvider>
    </html>
  );
}
