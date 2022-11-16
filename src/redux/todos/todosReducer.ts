import { InitialToDoItem } from "../../constants/todos";
import { CREATE_TODO, DELETE_TODO, SET_EDITABLE_TODO, UPDATE_TODO } from "./actionTypes";

const initialState = {
  todos: InitialToDoItem,
  editableTodo: null,
};

export const todosReducer = (state=initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => todo.id === payload.id ? payload : todo),
      } 

    case SET_EDITABLE_TODO:
      return {
        ...state,
        editableTodo: payload,
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      }  
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, payload]
      } 

    default: 
      return state
  }
};