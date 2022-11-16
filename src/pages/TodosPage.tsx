import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import { FormModal } from "../components/FormModal";
import { ToDoItems } from "../components/ToDoItems";
import { date } from "../constants/date";
import { createTodo, setEditableTodo, updateTodo } from "../redux/todos/actions";
import { IState } from "../redux/types";
import { STATUS } from "../types/enums";


export const TodosPage: FC = () => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('default');
  const [sortByDate, setSortByDate] = useState('default');

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
      const updatedTodo = {...editableTodo, title, description, updateDate: +(new Date()) };
      dispatch(updateTodo(updatedTodo));
    } else {
      const newDate = +(new Date());
      const newTodo = {id: v4(), title, description, status: STATUS.OPEN, creationDate: newDate, updateDate: newDate,};
      dispatch(createTodo(newTodo))
    }
    hideForm();
  },[editableTodo, dispatch, hideForm]);

  const onStatusChange = useCallback((event: any) => {
    setSelectedStatus(event.target.value)
  }, []);

  const onSortChange = useCallback((event: any) => {
    setSortByDate(event.target.value)
  }, [])

  return (
    <>
      <InputLabel id="demo-simple-select">Filter by status</InputLabel>
      <Select
            labelId="demo-simple-select"
            id="demo-simple-select"
            value={selectedStatus}
            label="status"
            onChange={onStatusChange}
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={STATUS.OPEN}>{STATUS.OPEN}</MenuItem>
            <MenuItem value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
            <MenuItem value={STATUS.DONE}>{STATUS.DONE}</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select">Sort by date</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo"
            value={sortByDate}
            label="date"
            onChange={onSortChange}
          >
            <MenuItem value={'default'}>Default</MenuItem>
            <MenuItem value={date.creationDate}>{'Creation date'}</MenuItem>
            <MenuItem value={date.updateDate}>{'Update date'}</MenuItem>
          </Select>
      <ToDoItems
      sortByDate={sortByDate}
      selectedStatus={selectedStatus}
      showForm={showForm}/>
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

