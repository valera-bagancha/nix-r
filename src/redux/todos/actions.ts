import { title } from 'process';
import { ChangeEvent, useState } from 'react';
import { URLS } from '../../constants/api'
import { addStatusesToGoods } from '../../helpers/addStatusesToGoods';
import { delay } from '../../helpers/delay';
import { createTodo, deleteTodo, loader, setTodos, updateTodo } from './actionsCreators'
import { AppDispatch } from './types'

  

export const getTodosAsync = () => async (dispatch: AppDispatch) => {
  dispatch(loader(true))
  const response = await fetch(URLS.goods);
  const goods = await response.json();
  await delay()
  dispatch(loader(false))
  dispatch(setTodos(addStatusesToGoods(goods.goods)));
}


export const deleteTodoAsync = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(loader(true))
 await fetch(`${URLS.goods}/${id}`, {
  method: 'DELETE',
 });
  await delay()
  dispatch(loader(false))
  dispatch(deleteTodo(id))
} 


export const createTodoAsync = (title: string, description: string) => async (dispatch: AppDispatch) => {
  dispatch(loader(true))
  const response = await fetch(`${URLS.goods}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({title, description, weight: '3'})
  });
  const todo = await response.json()
  await delay()
  dispatch(loader(false))
  dispatch(createTodo(todo))
 } 

 export const editTodoAsync = (id: string, title: string, description: string) => async (dispatch: AppDispatch) => {
  dispatch(loader(true))
  const response = await fetch(`${URLS.goods}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      },
     body: JSON.stringify({title, description})
  });
  const todo = await response.json()
  await delay()
  dispatch(loader(false))
  dispatch(updateTodo(todo))
 } 

 