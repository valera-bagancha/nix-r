import { Button, CircularProgress, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Component, FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { v4 } from 'uuid'

import  FormModal  from '../components/FormModal'
import { ToDoItems } from '../components/ToDoItems'
import { date } from '../constants/date'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getTodosAsync } from '../redux/todos/actions'
import { createTodo, updateTodo } from '../redux/todos/actionsCreators'
import { editableTodoSelector } from '../redux/todos/todoSelectors'
import { STATUS } from '../types/enums'
import { ITodo } from '../types'

interface IProps {
  dispatchGetTodosAsync: () => void;
  dispatchUpdateTodo: (updateTodo: any) => void;
  dispatchCreateTodo: (newTodo: any) => void;
  editableTodo: ITodo | null;
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
    const {sortByAlphabet, selectedStatus, isFormDisplayed, value} = this.state
    console.log(value);
    console.log(isFormDisplayed);
    console.log(selectedStatus);
    console.log(sortByAlphabet);
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
  }

  onSaveModal = (title: string, description: string) => {
    if (this.props.editableTodo) {
      const updatedTodo = {
        ...this.props.editableTodo,
        title,
        description,
        updateDate: +new Date(),
      }
      this.props.dispatchUpdateTodo(updateTodo)
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
      this.props.dispatchCreateTodo(newTodo)
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
            onClick={this.onSaveModal}
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
  dispatchUpdateTodo: (updatedTodo: any) => dispatch(updateTodo(updatedTodo)),
  dispatchCreateTodo: (newTodo: any) => dispatch(createTodo(newTodo))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage);

// export const TodosPage: FC = () => {
//   const [isFormDisplayed, setIsFormDisplayed] = useState(false)
//   const [selectedStatus, setSelectedStatus] = useState('default')
//   const [sortByAlphabet, setSortByAlphabet] = useState('default')
//   const [value, setValue] = useState('')

//   const editableTodo = useSelector(editableTodoSelector);
//   const dispatch = useAppDispatch()


//   useEffect(() => {
//     dispatch(getTodosAsync())
//   }, [])

//   const showForm = useCallback(() => {
//     setIsFormDisplayed(true)
    
//   }, [])

//   const hideForm = useCallback(() => {
//     setIsFormDisplayed(false)
//   }, [])

//   const onSaveModal = useCallback(
//     (title: string, description: string) => {
//       if (editableTodo) {
//         const updatedTodo = {
//           ...editableTodo,
//           title,
//           description,
//           updateDate: +new Date(),
//         }
//         dispatch(updateTodo(updatedTodo))
//       } else {
//         const newDate = +new Date()
//         const newTodo = {
//           id: v4(),
//           title,
//           description,
//           status: STATUS.OPEN,
//           creationDate: newDate,
//           updateDate: newDate,
//         }
//         dispatch(createTodo(newTodo))
//       }
//       hideForm()
//     },
//     [editableTodo, dispatch, hideForm]
//   )

//   const onStatusChange = useCallback((event: any) => {
//     setSelectedStatus(event.target.value)
//   }, [])

//   const onSortChange = useCallback((event: any) => {
//     setSortByAlphabet(event.target.value)
//   }, [])


//   return (
//     <>
//       <TextField placeholder='Search' value={value} onChange={e => setValue(e.target.value)}/>
//       <InputLabel id="demo-simple-select">Filter by status</InputLabel>
//       <Select
//         labelId="demo-simple-select"
//         id="demo-simple-select"
//         value={selectedStatus}
//         label="status"
//         onChange={onStatusChange}
//       >
//         <MenuItem value='default'>Default</MenuItem>
//         <MenuItem value={STATUS.OPEN}>{STATUS.OPEN}</MenuItem>
//         <MenuItem value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
//         <MenuItem value={STATUS.DONE}>{STATUS.DONE}</MenuItem>
//       </Select>
//       <InputLabel id="demo-simple-select">Sort by alphabet</InputLabel>
//       <Select
//         labelId="demo-simple-select-label"
//         id="demo"
//         value={sortByAlphabet}
//         label="date"
//         onChange={onSortChange}
//       >
//         <MenuItem value='default'>Default</MenuItem>
//         <MenuItem value={date.asc}>asc</MenuItem>
//         <MenuItem value={date.desc}>desc</MenuItem>
//       </Select>
//       <ToDoItems
//         value={value}
//         sortByAlphabet={sortByAlphabet}
//         selectedStatus={selectedStatus}
//         showForm={showForm}
//       />
//       {isFormDisplayed && (
//         <FormModal
//           defaultDescription={editableTodo?.description || ''}
//           defaultTitle={editableTodo?.title || ''}
//           onHideForm={hideForm}
//           onClick={onSaveModal}
//         />
//       )}
//       {!isFormDisplayed && (
//         <Button
//           onClick={showForm}
//           size="large"
//           sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
//         >
//           Add
//         </Button>
//       )}
//     </>
//   )
// }
