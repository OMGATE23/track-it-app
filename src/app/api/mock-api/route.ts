import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    throw new Error("testing error");
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}

const mockData = [
  {
    description: "Learn about Go's syntax and basic data types.",
    endTime: 660,
    startTime: 540,
    title: "Introduction to Go",
    date: "2024-07-18T12:12:23.897Z",
  },
  {
    description:
      "Understand how to work with control flow statements like if/else and loops in Go.",
    endTime: 840,
    startTime: 720,
    title: "Control Flow in Go",
    date: "2024-07-19T12:12:23.897Z",
  },
  {
    description: "Learn how to define and use functions in Go.",
    endTime: 1020,
    startTime: 900,
    title: "Functions in Go",
    date: "2024-07-20T12:12:23.897Z",
  },
  {
    description:
      "Explore how to work with collections of data using arrays and slices.",
    endTime: 1200,
    startTime: 1080,
    title: "Data Structures: Arrays and Slices",
    date: "2024-07-21T12:12:23.897Z",
  },
];
