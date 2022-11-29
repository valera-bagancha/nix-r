import { combineReducers } from 'redux'
import { todosReducer } from './todos/todosReducer';


export const rootReducer = combineReducers({ todos: todosReducer });