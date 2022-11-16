import { STATUS } from "./enums";

export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: STATUS;
  creationDate: number; 
  updateDate: number;
}  