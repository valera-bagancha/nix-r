import { ITodo } from "../../types";

export interface ITodosState {
  todos: ITodo[];
  editableTodo: ITodo | null;
};
