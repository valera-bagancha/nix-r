import { IState } from "../types";

export const editableTodoSelector = (state: IState) => state.todos.editableTodo;

export const todosSelector = (state: IState) => state.todos.todos;

export const loaderSelector = (state: IState) => state.todos.loading