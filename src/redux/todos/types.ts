import { ITodo } from "../../types";

export interface ITodosState {
  todos: ITodo[];
  editableTodo: ITodo | null;
  loading: boolean;

};

export enum ActionTypes {
  UPDATE_TODO = 'UPDATE_TODO',
  SET_EDITABLE_TODO = 'SET_EDITABLE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  CREATE_TODO = 'CREATE_TODO',
  SET_TODOS = 'SET_TODOS',
  CHARTS_LOADED = 'CHARTS_LOADED',
}
interface ISetTodoAction {
  type: ActionTypes.UPDATE_TODO | ActionTypes.SET_EDITABLE_TODO | ActionTypes.CREATE_TODO;
  payload: ITodo;
}

interface ISetLoader {
  type: ActionTypes.CHARTS_LOADED;
  payload: boolean;
}

interface IDeleteTodo {
  type: ActionTypes.DELETE_TODO;
  payload: string
}

interface ISetTodos {
  type: ActionTypes.SET_TODOS;
  payload: ITodo[];
} 

export type Action = ISetTodoAction | ISetLoader | IDeleteTodo | ISetTodos