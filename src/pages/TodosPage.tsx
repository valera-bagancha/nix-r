import { Button, CircularProgress, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

import { FormModal } from '../components/FormModal'
import { ToDoItems } from '../components/ToDoItems'
import { date } from '../constants/date'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getTodosAsync } from '../redux/todos/actions'
import { createTodo, updateTodo } from '../redux/todos/actionsCreators'
import { editableTodoSelector } from '../redux/todos/todoSelectors'
import { STATUS } from '../types/enums'

export const TodosPage: FC = () => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('default')
  const [sortByAlphabet, setSortByAlphabet] = useState('default')
  const [value, setValue] = useState('')

  const editableTodo = useSelector(editableTodoSelector);
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getTodosAsync())
  }, [])

  const showForm = useCallback(() => {
    setIsFormDisplayed(true)
  }, [])

  const hideForm = useCallback(() => {
    setIsFormDisplayed(false)
  }, [])

  const onSaveModal = useCallback(
    (title: string, description: string) => {
      if (editableTodo) {
        const updatedTodo = {
          ...editableTodo,
          title,
          description,
          updateDate: +new Date(),
        }
        dispatch(updateTodo(updatedTodo))
      } else {
        const newDate = +new Date()
        const newTodo = {
          id: v4(),
          title,
          description,
          status: STATUS.OPEN,
          creationDate: newDate,
          updateDate: newDate,
        }
        dispatch(createTodo(newTodo))
      }
      hideForm()
    },
    [editableTodo, dispatch, hideForm]
  )

  const onStatusChange = useCallback((event: any) => {
    setSelectedStatus(event.target.value)
  }, [])

  const onSortChange = useCallback((event: any) => {
    setSortByAlphabet(event.target.value)
  }, [])


  return (
    <>
      <TextField placeholder='Search' value={value} onChange={e => setValue(e.target.value)}/>
      <InputLabel id="demo-simple-select">Filter by status</InputLabel>
      <Select
        labelId="demo-simple-select"
        id="demo-simple-select"
        value={selectedStatus}
        label="status"
        onChange={onStatusChange}
      >
        <MenuItem value='default'>Default</MenuItem>
        <MenuItem value={STATUS.OPEN}>{STATUS.OPEN}</MenuItem>
        <MenuItem value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
        <MenuItem value={STATUS.DONE}>{STATUS.DONE}</MenuItem>
      </Select>
      <InputLabel id="demo-simple-select">Sort by alphabet</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo"
        value={sortByAlphabet}
        label="date"
        onChange={onSortChange}
      >
        <MenuItem value='default'>Default</MenuItem>
        <MenuItem value={date.asc}>asc</MenuItem>
        <MenuItem value={date.desc}>desc</MenuItem>
      </Select>
      <ToDoItems
        value={value}
        sortByAlphabet={sortByAlphabet}
        selectedStatus={selectedStatus}
        showForm={showForm}
      />
      {isFormDisplayed && (
        <FormModal
          defaultDescription={editableTodo?.description || ''}
          defaultTitle={editableTodo?.title || ''}
          onHideForm={hideForm}
          onClick={onSaveModal}
        />
      )}
      {!isFormDisplayed && (
        <Button
          onClick={showForm}
          size="large"
          sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
        >
          Add
        </Button>
      )}
    </>
  )
}
