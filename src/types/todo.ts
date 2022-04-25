import { Moment } from "moment";

export type TodoRoot = {
  id: number;
  title: string;
  done: boolean;
  startTime: Moment;
  endTime?: Moment;
  note?: string;
  comment?: string[];
  duration?: number;
}


