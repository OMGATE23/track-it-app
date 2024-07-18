export type TaskDimensions = {
  top: number;
  left: number;
  previousClientY: number;
  previousClientX: number;
  isMouseMoving: boolean;
  sliderY: number;
  addedHeight: number;
  isSliderMoving: boolean;
  isMouseUp: boolean;
};

export type TypeDimensionAction =
  | { type: "SET_TOP"; payload: number }
  | { type: "SET_LEFT"; payload: number }
  | { type: "SET_PREVIOUS_CLIENT_Y"; payload: number }
  | { type: "SET_PREVIOUS_CLIENT_X"; payload: number }
  | { type: "SET_MOUSE_MOVING"; payload: boolean }
  | { type: "SET_SLIDER_Y"; payload: number }
  | { type: "SET_ADDED_HEIGHT"; payload: number }
  | { type: "SET_SLIDER_MOVING"; payload: boolean }
  | { type: "SET_MOUSE_UP"; payload: boolean };


export interface Task {
  title: string;
  description?: string;
  date: Date;
  startTime: number;
  endTime: number;
  id: string;
  colour: string;
  project : string;
  tags : Resp_Tag[];
  userId : string;
}

export interface Project {
  title : string;
  description? : string;
  id : string
}

export type Tag = {
  tag: string;
  background: string;
  outline: string;
  type : string;
};

export type Resp_Tag = {
  type : string;
  tag : string;
} 

export type Tags = {
  task: Tag[];
  priority: Tag[];
  status: Tag[];
  department: Tag[];
  time: Tag[];
  efforts: Tag[];
  location: Tag[];
  ownership: Tag[];
  other : Tag[]
};


export type AIRequestData = {
  title : string,
  description : string,
  startTime : number, 
  endTime : number,
  startDay : Date,
  numberOfDays : number,
  letAIDecideTime : boolean
}

export interface Resp_AI_Task  {
  title : string,
  description : string,
  startTime : number,
  endTime : number
}

export interface Raw_AI_Task extends Resp_AI_Task {
  date : string
}

export interface P_AI_Task extends Resp_AI_Task {
  date : Date,
}

export interface AI_Tasks_Response {
  results : P_AI_Task[]
}
