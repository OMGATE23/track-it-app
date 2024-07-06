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
  tags : string[];
  userId : string;
}

export interface Project {
  title : string;
  description? : string;
  id : string
}