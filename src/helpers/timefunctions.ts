import { Task } from "@/context/TaskContext";

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
