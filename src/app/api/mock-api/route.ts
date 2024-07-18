import { NextResponse } from "next/server"


export async function POST(request : Request){
  try {
  return NextResponse.json({
    results : mockData
  })
  } catch(error){
    return NextResponse.json({
      error : error
    })
  }
}

const mockData = [
  {
      "description": "Learn about Go's syntax and basic data types.",
      "endTime": 660,
      "startTime": 540,
      "title": "Introduction to Go",
      "date": "2024-07-18T12:12:23.897Z"
  },
  {
      "description": "Understand how to work with control flow statements like if/else and loops in Go.",
      "endTime": 840,
      "startTime": 720,
      "title": "Control Flow in Go",
      "date": "2024-07-19T12:12:23.897Z"
  },
  {
      "description": "Learn how to define and use functions in Go.",
      "endTime": 1020,
      "startTime": 900,
      "title": "Functions in Go",
      "date": "2024-07-20T12:12:23.897Z"
  },
  {
      "description": "Explore how to work with collections of data using arrays and slices.",
      "endTime": 1200,
      "startTime": 1080,
      "title": "Data Structures: Arrays and Slices",
      "date": "2024-07-21T12:12:23.897Z"
  },
  {
      "description": "Learn about Go's way of handling key-value pairs.",
      "endTime": 660,
      "startTime": 540,
      "title": "Data Structures: Maps",
      "date": "2024-07-22T12:12:23.897Z"
  },
  {
      "description": "Understand how to define your own types with structs.",
      "endTime": 840,
      "startTime": 720,
      "title": "Data Structures: Structs",
      "date": "2024-07-23T12:12:23.897Z"
  },
  {
      "description": "Dive into pointers and understand how they work in Go.",
      "endTime": 1020,
      "startTime": 900,
      "title": "Understanding Pointers",
      "date": "2024-07-24T12:12:23.897Z"
  },
  {
      "description": "Learn how to handle errors effectively in your Go programs.",
      "endTime": 1200,
      "startTime": 1080,
      "title": "Error Handling in Go",
      "date": "2024-07-25T12:12:23.897Z"
  },
  {
      "description": "Understand how to organize your code using packages.",
      "endTime": 660,
      "startTime": 540,
      "title": "Working with Packages",
      "date": "2024-07-26T12:12:23.897Z"
  },
  {
      "description": "Learn how concurrency works in Go with Goroutines.",
      "endTime": 840,
      "startTime": 720,
      "title": "Introduction to Concurrency",
      "date": "2024-07-27T12:12:23.897Z"
  },
  {
      "description": "Explore how to synchronize concurrent operations using channels.",
      "endTime": 1020,
      "startTime": 900,
      "title": "Concurrency with Channels",
      "date": "2024-07-28T12:12:23.897Z"
  },
  {
      "description": "Learn best practices for writing clean and maintainable Go code.",
      "endTime": 1200,
      "startTime": 1080,
      "title": "Go Best Practices",
      "date": "2024-07-29T12:12:23.897Z"
  }
]