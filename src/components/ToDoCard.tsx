import { useCallback, FC, useState, useEffect } from 'react'
import {  useSelector } from 'react-redux'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material'
import { STATUS } from '../types/enums'
import { setEditableTodo, updateTodo } from '../redux/todos/actionsCreators'
import { ITodo } from '../types'
import { statusBgs } from '../constants/statusBgs'
import { deleteTodoAsync } from '../redux/todos/actions'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { loaderSelector } from '../redux/todos/todoSelectors'

interface IProps {
  todo: ITodo
  showForm: () => void
}


export const TodoCard: FC<IProps> = ({ todo, showForm }) => {
  const { id, title, description, status } = todo
  const [selectedStatus, setSelectedStatus] = useState<STATUS>(status)

  const loading = useSelector(loaderSelector)
  const dispatch = useAppDispatch()

  const onEditTodo = useCallback(() => {
    dispatch(setEditableTodo(todo))
    showForm()
  }, [todo, showForm])

  const onDeleteTodo = useCallback(
    () => dispatch(deleteTodoAsync(id)),
    [dispatch, id]
  )


  const onChange = useCallback((event: SelectChangeEvent<unknown>) => {
    setSelectedStatus(event.target.value as STATUS)
  }, [])

  useEffect(() => {
    if (status === selectedStatus) return

    const updatedTodo = { ...todo, status: selectedStatus }

    dispatch(updateTodo(updatedTodo))
  }, [dispatch, selectedStatus, todo, status])

  return (
    <div>
    {loading ? <Card><CircularProgress/></Card> : (
      <Card
        className="body-card"
        sx={{ width: 275, margin: '10px', backgroundColor: statusBgs[status] }}
      >
        <Box sx={{ width: 128 }} className="status">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={onChange}
            >
              <MenuItem value={STATUS.OPEN}>{STATUS.OPEN}</MenuItem>
              <MenuItem value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
              <MenuItem value={STATUS.DONE}>{STATUS.DONE}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <CardContent>
          <Typography sx={{ fontSize: 15 }}>{title}</Typography>
          <Typography variant="body2" color="gray">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onEditTodo}>
            Edit
          </Button>
          <Button size="small" onClick={onDeleteTodo}>
            Remove
          </Button>
        </CardActions>
      </Card>
    )}
    </div>
  )
}
