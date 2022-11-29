import { IState } from "../types";

export const editableTodoSelector = (state: IState) => state.todos.editableTodo;

export const todosSelector = (state: any) => state.todos.todos;

export const loaderSelector = (state: any) => state.todos.loading