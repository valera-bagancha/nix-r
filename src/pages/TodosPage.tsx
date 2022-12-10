import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Component} from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import  FormModal  from '../components/FormModal'
import { ToDoItems } from '../components/ToDoItems'
import { date } from '../constants/date'
import { getTodosAsync, editTodoAsync, createTodoAsync} from '../redux/todos/actions'
import { setEditableTodo } from '../redux/todos/actionsCreators'
import { editableTodoSelector } from '../redux/todos/todoSelectors'
import { STATUS } from '../types/enums'
import { ITodo } from '../types'

interface IProps {
  dispatchGetTodosAsync: () => void;
  dispatchUpdateTodoAsync: (updateTodo: any) => void;
  dispatchCreateTodoAsync: (newTodo: any) => void;
  editableTodo: ITodo | null;
  dispatchSetEditableTodo: () => void
}
interface IState {
  isFormDisplayed: boolean;
  selectedStatus: string;
  sortByAlphabet: string;
  value: string;
}
class TodosPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFormDisplayed: false,
      selectedStatus: 'default',
      sortByAlphabet: 'default',
      value: ''
    };
  }

  componentDidMount() {
    this.func()
  }
  
  componentDidUpdate() {
    this.func()
  }

  func = () => {
    this.props.dispatchGetTodosAsync()
  }

  showForm = () => {
    this.setState({
      isFormDisplayed: true
    })
  }

  hideForm = () => {
    this.setState({
      isFormDisplayed: false
    })
    this.props.dispatchSetEditableTodo()
  }

  onUpdateItem = (title: string, description: string) => {
    
    if (this.props.editableTodo) {
      const updatedTodo = {
        ...this.props.editableTodo,
        title,
        description,
        updateDate: +new Date(),
      }
      this.props.dispatchUpdateTodoAsync(updatedTodo)
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
      this.props.dispatchCreateTodoAsync(newTodo)
    }
    this.hideForm()
  }


  onStatusChange = (event: any) => {
    this.setState({
      selectedStatus: event.target.value
    })
  }

  onSortChange = (event: any) => {
    this.setState({
      sortByAlphabet: event.target.value
    })
  }

  render() {
    const {value, selectedStatus, sortByAlphabet, isFormDisplayed} = this.state
    return(
      <>
        <TextField placeholder='Search' value={value} onChange={e => this.setState({value: e.target.value})}/>
        <InputLabel id="demo-simple-select">Filter by status</InputLabel>
        <Select
          labelId="demo-simple-select"
          id="demo-simple-select"
          value={selectedStatus}
          label="status"
          onChange={this.onStatusChange}
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
          onChange={this.onSortChange}
        >
          <MenuItem value='default'>Default</MenuItem>
          <MenuItem value={date.asc}>asc</MenuItem>
          <MenuItem value={date.desc}>desc</MenuItem>
        </Select>
        <ToDoItems
          value={value}
          sortByAlphabet={sortByAlphabet}
          selectedStatus={selectedStatus}
          showForm={this.showForm}
        />
        {isFormDisplayed && (
          <FormModal
            defaultDescription={this.props.editableTodo?.description || ''}
            defaultTitle={this.props.editableTodo?.title || ''}
            onHideForm={this.hideForm}
            onClick={this.onUpdateItem}
          />
        )}
        {!isFormDisplayed && (
          <Button
            onClick={this.showForm}
            size="large"
            sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
          >
            Add
          </Button>
        )}
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({
  editableTodo: editableTodoSelector(state)
})


const mapDispatchToProps = (dispatch: any) => ({
  dispatchGetTodosAsync: () => dispatch(getTodosAsync()),
  dispatchUpdateTodoAsync: ({id, title, description}: any ) => dispatch(editTodoAsync(id, title, description)),
  dispatchCreateTodoAsync: ({title, description}: any ) => dispatch(createTodoAsync(title, description)),
  dispatchSetEditableTodo: () => dispatch(setEditableTodo(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage);

