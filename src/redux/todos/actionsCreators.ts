
import { ITodo } from "../../types";
import { ActionTypes } from "./types";

const { CHARTS_LOADED, CREATE_TODO, DELETE_TODO, SET_EDITABLE_TODO, SET_TODOS, UPDATE_TODO } = ActionTypes;

export const updateTodo = (todo: ITodo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const setEditableTodo = (todo: ITodo | null) => ({
  type: SET_EDITABLE_TODO,
  payload: todo,
});

export const loader =  (isLoading: boolean) => ({
  type: CHARTS_LOADED,
  payload: isLoading,   
})

export const deleteTodo = (todoId: string) => ({
  type: DELETE_TODO,
  payload: todoId,
});

export const createTodo = (todo: ITodo) => ({
  type: CREATE_TODO,
  payload: todo,
});

export const setTodos = (todos: ITodo[]) => ({
  type: SET_TODOS,
  payload: todos,
});