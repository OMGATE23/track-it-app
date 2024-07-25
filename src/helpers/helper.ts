import { MONTHS, MONTHS_FULL_NAME, TAGS } from "./constansts";
import {
  ProjectPriority,
  ProjectStatus,
  Resp_Project,
  Resp_Tag,
  Tag,
  Task,
} from "./types";

export function sameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function addOrSubtractTime(timeNum: number, sign: number): number {
  timeNum += sign * 15;
  return timeNum;
}

export function numberToTime(time: number) {
  return `${String(Math.floor(Math.abs(time) / 60)).padStart(2, "0")}:${String(
    Math.abs(time) % 60
  ).padStart(2, "0")}`;
}

export function getDatesInCurrentMonth(displayDate: Date): Array<Date> {
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  let firstDay = new Date(year, month, 1);
  let firstDayPrevWeek = new Date(year, month, 1 - firstDay.getDay());

  let lastDay = new Date(year, month + 1, 0);
  let lastDayNextWeek = new Date(year, month + 1, 6 - lastDay.getDay());
  const datesArray = [];
  let curr = new Date(firstDayPrevWeek);
  while (curr <= lastDayNextWeek) {
    datesArray.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return datesArray;
}
export function isSameMonth(date: Date, displayDate: Date) {
  return date.getMonth() === displayDate.getMonth();
}

export function monthDayYearFormatDate(date: Date): string {
  const day = date.getDate();
  const month = MONTHS_FULL_NAME[date.getMonth()];
  const year = date.getFullYear();

  let daySuffix;
  if (day % 10 === 1 && day !== 11) {
    daySuffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    daySuffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  return `${month} ${day}${daySuffix}, ${year}`;
}

export function getProcessedTags(tags: Resp_Tag[] = []): Tag[] {
  let processedTags: Tag[] = [];

  processedTags = tags.map(
    (t) => TAGS[t.type].find((findTag) => findTag.tag === t.tag)!
  );
  return processedTags;
}

export function priorityStyling(priority: ProjectPriority): string {
  if (priority === ProjectPriority.High) {
    return "bg-red-500";
  }

  if (priority === ProjectPriority.Low) {
    return "bg-green-500";
  }

  if (priority === ProjectPriority.Medium) {
    return "bg-yellow-300";
  }

  return "";
}

export function statusStyling(status: ProjectStatus): string {
  if (status === ProjectStatus.Active) {
    return "bg-green-500";
  }

  if (status === ProjectStatus.Done) {
    return "bg-zinc-400";
  }

  if (status === ProjectStatus.Paused) {
    return "bg-orange-400";
  }

  return "";
}

export function getAverageTaskTime(tasks: Task[]): string {
  let totalTime = 0;

  tasks.forEach((task) => {
    totalTime += task.endTime - task.startTime;
  });

  return formatMinutes(totalTime / tasks.length);
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  let result = "";

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (remainingMinutes > 0) {
    if (hours > 0) {
      result += " ";
    }
    result += `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;
  }

  return result;
}

export function getDatesInSameWeek(date: Date): Date[] {
  const datesInWeek: Date[] = [];
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);

  startOfWeek.setDate(date.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    datesInWeek.push(currentDate);
  }

  return datesInWeek;
}

export function countTasksByDate(
  dates: Date[],
  tasks: Task[]
): Record<string, number> {
  const result: Record<string, number> = {};

  dates.forEach((date) => {
    const dateString = date.toISOString().split("T")[0];
    result[dateString] = 0;
  });

  tasks.forEach((task) => {
    const taskDateString = task.date.toISOString().split("T")[0];
    if (result.hasOwnProperty(taskDateString)) {
      result[taskDateString]++;
    }
  });

  return result;
}

export function dayMonthDateFormat(date: Date): string {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  return `${day} ${month}`;
}

export function countAndAvgTasksByDate(
  dates: Date[],
  tasks: Task[]
): { date: string; count: number; totalTime: number }[] {
  const result: { [key: string]: { count: number; totalTime: number } } = {};

  // Initialize the result object with dates
  dates.forEach((date) => {
    const formattedDate = dayMonthDateFormat(date);
    result[formattedDate] = { count: 0, totalTime: 0 };
  });

  // Calculate the count and total time for each date
  tasks.forEach((task) => {
    const taskFormattedDate = dayMonthDateFormat(task.date);
    if (result.hasOwnProperty(taskFormattedDate)) {
      result[taskFormattedDate].count++;
      const taskTime = task.endTime - task.startTime;
      result[taskFormattedDate].totalTime += taskTime;
    }
  });

  // Convert the result object to an array of objects
  return Object.keys(result).map((date) => ({
    date,
    count: result[date].count,
    totalTime: result[date].totalTime,
  }));
}

export function countTagsByType(
  tasks: Task[]
): Record<string, (Tag & { count: number })[]> {
  const result: Record<string, (Tag & { count: number })[]> = {};

  for (const type in TAGS) {
    result[type] = TAGS[type].map((tag) => ({ ...tag, count: 0 }));
  }

  tasks.forEach((task) => {
    task.tags.forEach((tag) => {
      const tagArray = result[tag.type];
      if (tagArray) {
        const tagObject = tagArray.find((t) => t.tag === tag.tag);
        if (tagObject) {
          tagObject.count++;
        }
      }
    });
  });

  return result;
}

export function summarizeProjects(
  tasks: Task[],
  projects: Resp_Project[]
): { projectId: string; project: string; count: number; totalTime: number }[] {
  const projectSummary: Record<
    string,
    { project: string; count: number; totalTime: number }
  > = {};

  projects.forEach((project) => {
    projectSummary[project.id] = {
      project: project.title,
      count: 0,
      totalTime: 0,
    };
  });

  tasks.forEach((task) => {
    if (projectSummary[task.projectId]) {
      projectSummary[task.projectId].count++;
      const taskTime = task.endTime - task.startTime;
      projectSummary[task.projectId].totalTime += taskTime;
    }
  });

  return Object.keys(projectSummary).map((projectId) => ({
    projectId,
    project: projectSummary[projectId].project,
    count: projectSummary[projectId].count,
    totalTime: projectSummary[projectId].totalTime,
  }));
}
