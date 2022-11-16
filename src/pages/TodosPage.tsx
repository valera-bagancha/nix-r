import { Button } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import { FormModal } from "../components/FormModal";
import { ToDoItems } from "../components/ToDoItems";
import { createTodo, setEditableTodo, updateTodo } from "../redux/todos/actions";
import { IState } from "../redux/types";
import { STATUS } from "../types/enums";


export const TodosPage: FC = () => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const editableTodo = useSelector((state: IState) => state.todos.editableTodo);
  const dispatch = useDispatch();

  const showForm = useCallback(() => {
    setIsFormDisplayed(true)
  },[]);

  const hideForm = useCallback(() => {
    setIsFormDisplayed(false);
    dispatch(setEditableTodo(null));
  },[dispatch]);

  const onSaveModal = useCallback((title: string, description: string) => {
    if(editableTodo) {
      const updatedTodo = {...editableTodo, title, description };
      dispatch(updateTodo(updatedTodo));
    } else {
      const newTodo = {id: v4(), title, description, status: STATUS.OPEN};
      dispatch(createTodo(newTodo))
    }
    hideForm();
  },[editableTodo, dispatch, hideForm]);

  return (
    <>
      <Button 
        size="large" 
        sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
      >Filter By Status</Button>
      <Button 
        size="large" 
        sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
      >Filter By Creation</Button>
      <Button 
        size="large" 
        sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
      >Filter By Update dates</Button>
      <ToDoItems showForm={showForm}/>
      {isFormDisplayed && <FormModal 
        defaultDescription={editableTodo?.description || ''} 
        defaultTitle={editableTodo?.title || ''} 
        onHideForm={hideForm} 
        onClick={onSaveModal} 
      /> }
      {!isFormDisplayed && <Button 
        onClick={showForm} 
        size="large" 
        sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
      >Add</Button>}
    </>
  )
}