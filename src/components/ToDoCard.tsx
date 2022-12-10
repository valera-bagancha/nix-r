import React, { useCallback, FC, useState, useEffect, Component } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
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
} from '@mui/material'
import { STATUS } from '../types/enums'
import { deleteTodo, setEditableTodo, updateTodo } from '../redux/todos/actionsCreators'
import { ITodo } from '../types'
import { statusBgs } from '../constants/statusBgs'
import { URLS } from '../constants/api'
import { deleteTodoAsync } from '../redux/todos/actions'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { loaderSelector } from '../redux/todos/todoSelectors'

interface IProps {
  todo: ITodo
  showForm: () => void
  dispatchPutUpdateTodo: (updateTodo: any) => void
  dispatchOnEditTodo: (todo: ITodo) => void
  dispatchOnDeleteTodo: (id: any) => void
}

interface IState {
  selectedStatus: STATUS
}

class TodoCard extends Component<IProps, IState > {
  constructor(props: IProps) {
    super(props);
    this.state = {
    selectedStatus: props.todo.status,
    };
    const {selectedStatus} = this.state
    console.log(selectedStatus);
    console.log(props.showForm);
  }

  componentDidMount() {
    this.func()
  }
  
  componentDidUpdate() {
    this.func()
  }

  func = () => {
    const {dispatchPutUpdateTodo, todo} = this.props
    const {status} = todo
    const {selectedStatus} = this.state
    if (status === selectedStatus) return

    const updatedTodo = { ...todo, status: selectedStatus }

    dispatchPutUpdateTodo(updatedTodo)
  }

  onChange = (event: any) => {
    this.setState({
      selectedStatus: event.target.value
    })
  }

  onEditTodo = () => {
    const {showForm, todo, dispatchOnEditTodo} = this.props
    dispatchOnEditTodo(todo)
    showForm()
  }

  onDeleteTodo = () => {
    const {dispatchOnDeleteTodo, todo} = this.props
    const {id} = todo
    dispatchOnDeleteTodo(id)
  }

  render() {
    const {todo} = this.props
    const {status, title, description} = todo
    return(
      <div>
    {false ? <Card><CircularProgress/></Card> : (
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
              onChange={this.onChange}
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
          <Button size="small" onClick={this.onEditTodo}>
            Edit
          </Button>
          <Button size="small" onClick={this.onDeleteTodo}>
            Remove
          </Button>
        </CardActions>
      </Card>
    )}
    </div>
    );
  }
}

const mapStateToProps = (state: any) => ({

})


const mapDispatchToProps = (dispatch: any) => ({
  dispatchPutUpdateTodo: (updatedTodo: any) => dispatch(updateTodo(updatedTodo)),
  dispatchOnEditTodo: (todo: ITodo) => dispatch(setEditableTodo(todo)),
  dispatchOnDeleteTodo: (id: any) => dispatch(deleteTodoAsync(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard);

/* export const TodoCard: FC<IProps> = ({ todo, showForm }) => {
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


  const onChange = useCallback((event: any) => {
    setSelectedStatus(event.target.value)
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
} */
