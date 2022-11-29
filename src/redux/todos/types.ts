import { ITodo } from "../../types";
import { store } from "../store";

export interface ITodosState {
  todos: ITodo[];
  editableTodo: ITodo | null;
};

export type AppDispatch = typeof store.dispatch