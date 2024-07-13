import { MONTHS_FULL_NAME, TAGS } from "./constansts";
import { Resp_Tag, Tag } from "./types";

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

export function monthDayYearFormatDate(date : Date) : string {
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

export function getProcessedTags(tags : Resp_Tag[] = []) : Tag[] {
  let processedTags : Tag[] = []

  processedTags = tags.map(t => (
    TAGS[t.type].find(findTag => findTag.tag === t.tag)!
  ))
  return processedTags
}