import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/AuthContext";
import DateContextProvider from "@/context/DateContext";
import TaskContextProvider from "@/context/TaskContext";
import ProjectsContextProvider from "@/context/ProjectContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon : {
      url : '/assets/icons/calendar.svg'
    }
  },
  title: "TrackIt",
  description:
    "TrackIt: Simplify project management with our AI-driven scheduler. Create clear, actionable plans effortlessly. Save time, reduce stress, and achieve your goals with TrackIt.",
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
              <body className={inter.className + " min-h-[100vh]"}>
                {children}
              </body>
            </TaskContextProvider>
          </ProjectsContextProvider>
        </DateContextProvider>
      </AuthContextProvider>
    </html>
  );
}
