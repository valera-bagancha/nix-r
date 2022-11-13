import React from 'react';
import {v4 as uuidv4} from 'uuid';
import { ToDoItems } from './components/ToDoItems';
import { AddFormModal } from './components/AddFormModal'
import  './App.css';
import { Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { InitialToDoItem } from './constants/todos'
import { isTemplateExpression } from 'typescript';


const App = () => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)
  const [editingItem, setEditingItem] = useState(null);
  const [goods, setGoods] = useState(InitialToDoItem)

  const displayForm = useCallback(() => {
    setIsFormDisplayed(true)
  },[]);

  const hideForm = useCallback(() => {
    setIsFormDisplayed(false)
  },[]);

  const onAddItem = useCallback((item: any) => {
    setGoods([...goods, {...item, id: uuidv4()}])
    hideForm()
  }, [goods, hideForm]);
  
  const onEditItem = useCallback((itemId: any) => {
    const item: any = goods.find((g) => g.id === itemId)
    setEditingItem(item)
    setIsFormDisplayed(true)
  },[goods]);

  const onSaveItem = useCallback((item: any) => {
    setGoods(goods.map((g) => g.id === item.id ? item : g));
    setIsFormDisplayed(false);
    setEditingItem(null)
  }, [goods])

  return (
     <div className='App' >
      <ToDoItems goods={goods} onEditItem={onEditItem}/>
      {isFormDisplayed && <AddFormModal onAddItem={onAddItem} onHideForm={hideForm} item={editingItem} onEditItem={onSaveItem}/> }
      {!isFormDisplayed && <Button onClick={displayForm} size="large" sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}>Add</Button>}
    </div>   
  )
}

export default App;
