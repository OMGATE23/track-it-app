import { AIRequestData, P_AI_Task, Raw_AI_Task } from "@/helpers/types";
import { FunctionDeclarationSchemaType, GoogleGenerativeAI, ResponseSchema } from "@google/generative-ai"
import { NextResponse } from "next/server"


export async function POST(request : Request){
  try {
    let requestData : AIRequestData = await request.json()
  let genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: getResponseSchema(requestData.letAIDecideTime)
      
    }
  });
  
  let prompt = generatePromptFromSchema(requestData);
  let startDay = new Date(requestData.startDay)
  let result = await model.generateContent(prompt)
  let tasks : Raw_AI_Task[] = JSON.parse(result.response.text())
  console.log(JSON.parse(result.response.text()))
  let processedTasks : P_AI_Task[] =  tasks.map((task , i) => {
    const newDate = new Date(startDay)
    newDate.setDate(startDay.getDate() + i)
    if(!requestData.letAIDecideTime){
      task.startTime = requestData.startTime;
      task.endTime = requestData.endTime;
    }

    if(task.startTime > 1440 || task.endTime > 1440){
      task.startTime = requestData.startTime;
      task.endTime = requestData.endTime;
    }

    return {...task , date : newDate}
  } 
) 
  return NextResponse.json({
    results : processedTasks,
    requestData
  })
  } catch(error){
    console.log(error)
    return NextResponse.json({
      error : error
    })
  }
}

function generatePromptFromSchema(data : AIRequestData) : string {
  const { title, description, numberOfDays, startTime, endTime, startDay, letAIDecideTime } = data;

  const startDate = new Date(startDay);
  const formattedStartDate = startDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

  let timeSlotMessage = "";
  if (letAIDecideTime) {
    timeSlotMessage = "You can decide appropriate time slots for these tasks.";
  } else {
    timeSlotMessage = `The time slot for each task is from ${startTime} minutes (from 00:00) to ${endTime} minutes (from 00:00).`;
  }

  const prompt = `
  Generate a schedule for the following task:

  Title: ${title}
  Description: ${description}
  Start Date: ${formattedStartDate}
  Number of Days: ${numberOfDays}
  ${timeSlotMessage}

  I need you to create a detailed roadmap for the given no of days to fulfil the task. Make sure the schedule you create to fulfil the task.

  The fields for each task are:
  - title
  - description
  - startTime (in minutes from 00:00) // if in the schema
  - endTime (in minutes from 00:00) // if in the schema

  If start time and end time are required in response schema, the start time and end time for the task should have meaningful difference between them and dont keep them very long
  make sure the start time is also sensible (ideally between afternoon and evening). 

  IMPORTANT : If start time and end time are required in response schema, start time and endtime are in minutes from 00:00. The minimum value is 0 and maximum is 1440

  Continue generating tasks for the given number of days with appropriate titles and descriptions.
  `;

  return prompt;
}

function getResponseSchema(aiToDecideTime : boolean) : ResponseSchema {
  if(!aiToDecideTime){
    return ({
      type: FunctionDeclarationSchemaType.ARRAY,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          title: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          description: {
            type: FunctionDeclarationSchemaType.STRING,
          }
        },
        required: ["title", "description"],
      },
})
  } else {
    return ({
        
      type: FunctionDeclarationSchemaType.ARRAY,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          title: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          description: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          startTime: {
            type: FunctionDeclarationSchemaType.INTEGER,
          },
          endTime: {
            type: FunctionDeclarationSchemaType.INTEGER,
          },
        },
        required: ["title", "description", "startTime", "endTime"],
      },
})
  }
}