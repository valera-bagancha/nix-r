import { Action, ITodosState, ActionTypes } from './types'

const initialState = {
  todos: [],
  editableTodo: null,
  loading: false,
}

export const todosReducer = (state: ITodosState = initialState, { type, payload }: Action) => {
  switch (type) {
    case ActionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === payload.id ? payload : todo
        ),
      }

    case ActionTypes.SET_EDITABLE_TODO:
      return {
        ...state,
        editableTodo: payload,
      }
    case ActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload),
      }
    case ActionTypes.CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      }
    case ActionTypes.SET_TODOS:
      return {
        ...state,
        todos: payload,
      }
    case ActionTypes.CHARTS_LOADED:
      return {
        ...state,
        loading: payload,
      }

    default:
      return state
  }
}
