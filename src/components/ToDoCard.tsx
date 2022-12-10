import { Component } from 'react'
import { connect } from 'react-redux'
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
import { setEditableTodo, updateTodo } from '../redux/todos/actionsCreators'
import { ITodo } from '../types'
import { statusBgs } from '../constants/statusBgs'
import { deleteTodoAsync } from '../redux/todos/actions'

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
