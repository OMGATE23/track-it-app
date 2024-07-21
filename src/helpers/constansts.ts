import { ProjectPriority, ProjectStatus, Tag, Tags } from "./types";

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MONTHS_FULL_NAME = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


export const colourOptions = [
  "bg-blue-500",
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-500",
  "bg-slate-600",
  "bg-fuchsia-600",
  "bg-pink-400",
];


export const TAGS: Record<typeof TAG_TYPES[number], Tag[]> = {
  task: [
    { type: 'task', tag: "Meeting", background: "bg-blue-500", outline: "outline-blue-700" },
    { type: 'task', tag: "Email", background: "bg-lime-500", outline: "outline-lime-700" },
    { type: 'task', tag: "Coding", background: "bg-fuchsia-500", outline: "outline-fuchsia-700" },
    { type: 'task', tag: "Design", background: "bg-rose-500", outline: "outline-rose-700" },
    { type: 'task', tag: "Research", background: "bg-amber-500", outline: "outline-amber-700" },
    { type: 'task', tag: "Review", background: "bg-violet-500", outline: "outline-violet-700" },
    { type: 'task', tag: "Testing", background: "bg-teal-500", outline: "outline-teal-700" },
    { type: 'task', tag: "Documentation", background: "bg-sky-500", outline: "outline-sky-700" },
    { type: 'task', tag: "Planning", background: "bg-orange-500", outline: "outline-orange-700" }
  ],
  priority: [
    { type: 'priority', tag: "High", background: "bg-red-500", outline: "outline-red-700" },
    { type: 'priority', tag: "Medium", background: "bg-yellow-500", outline: "outline-yellow-700" },
    { type: 'priority', tag: "Low", background: "bg-green-500", outline: "outline-green-700" }
  ],
  status: [
    { type: 'status', tag: "To-Do", background: "bg-gray-500", outline: "outline-gray-700" },
    { type: 'status', tag: "In Progress", background: "bg-blue-500", outline: "outline-blue-700" },
    { type: 'status', tag: "Completed", background: "bg-emerald-500", outline: "outline-emerald-700" },
    { type: 'status', tag: "Blocked", background: "bg-red-500", outline: "outline-red-700" },
    { type: 'status', tag: "Deferred", background: "bg-orange-500", outline: "outline-orange-700" }
  ],
  department: [
    { type: 'department', tag: "Marketing", background: "bg-purple-500", outline: "outline-purple-700" },
    { type: 'department', tag: "Development", background: "bg-indigo-500", outline: "outline-indigo-700" },
    { type: 'department', tag: "Sales", background: "bg-amber-500", outline: "outline-amber-700" },
    { type: 'department', tag: "HR", background: "bg-pink-500", outline: "outline-pink-700" },
    { type: 'department', tag: "Finance", background: "bg-teal-500", outline: "outline-teal-700" }
  ],
  time: [
    { type: 'time', tag: "Morning", background: "bg-yellow-500", outline: "outline-yellow-700" },
    { type: 'time', tag: "Afternoon", background: "bg-orange-500", outline: "outline-orange-700" },
    { type: 'time', tag: "Evening", background: "bg-purple-500", outline: "outline-purple-700" },
    { type: 'time', tag: "Weekend", background: "bg-pink-500", outline: "outline-pink-700" }
  ],
  efforts: [
    { type: 'efforts', tag: "Quick", background: "bg-lime-500", outline: "outline-lime-700" },
    { type: 'efforts', tag: "Moderate", background: "bg-blue-500", outline: "outline-blue-700" },
    { type: 'efforts', tag: "Extensive", background: "bg-red-500", outline: "outline-red-700" }
  ],
  location: [
    { type: 'location', tag: "Office", background: "bg-gray-500", outline: "outline-gray-700" },
    { type: 'location', tag: "Home", background: "bg-green-500", outline: "outline-green-700" },
    { type: 'location', tag: "Client Site", background: "bg-blue-500", outline: "outline-blue-700" },
    { type: 'location', tag: "Remote", background: "bg-indigo-500", outline: "outline-indigo-700" }
  ],
  ownership: [
    { type: 'ownership', tag: "Personal", background: "bg-pink-500", outline: "outline-pink-700" },
    { type: 'ownership', tag: "Professional", background: "bg-blue-500", outline: "outline-blue-700" }
  ],
  other: [
    { type: 'other', tag: "Other", background: "bg-black", outline: "outline-black" }
  ]
};


export const TAG_TYPES : string[] = ['task',  'priority', 'status', 'department', 'time', 'efforts' , 'location' , 'ownership' , 'other'] as const

export const projectStatus = Object.values(ProjectStatus)

export const projectPriority = Object.values(ProjectPriority)