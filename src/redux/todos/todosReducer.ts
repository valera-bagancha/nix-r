import {
  CHARTS_LOADED,
  CREATE_TODO,
  DELETE_TODO,
  SET_EDITABLE_TODO,
  SET_TODOS,
  UPDATE_TODO,
} from './actionTypes'
import { ITodosState } from './types'

const initialState = {
  todos: [],
  editableTodo: null,
  loading: false,
}

export const todosReducer = (state: ITodosState = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === payload.id ? payload : todo
        ),
      }

    case SET_EDITABLE_TODO:
      return {
        ...state,
        editableTodo: payload,
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload),
      }
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      }
    case SET_TODOS:
      return {
        ...state,
        todos: payload,
      }
    case CHARTS_LOADED:
      return {
        ...state,
        loading: payload,
      }

    default:
      return state
  }
}
