import { Moment } from "moment";

export type TodoRoot = {
  id: number;
  title: string;
  done: boolean;
  // startTime: Moment;
  startTime: string;
  // endTime?: Moment;
  endTime?: string;
  note?: string;
  comment?: string[];
  duration?: number;
}


