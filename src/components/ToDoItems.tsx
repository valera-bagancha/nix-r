import { useSelector, connect } from 'react-redux'
import { Component, FC, useMemo } from 'react'
import { CircularProgress } from '@mui/material'
import  TodoCard  from './ToDoCard'
import { ITodo } from '../types'
import { loaderSelector, todosSelector } from '../redux/todos/todoSelectors'

interface IProps {
  showForm: () => void
  selectedStatus: string
  sortByAlphabet: string
  value: string
}



// class ToDoItems extends Component<IProps> {  
//   constructor(props: IProps) {
//     super(props);
//     this.state = {
    
//     };
//     console.log(props.showForm);
//     console.log(props.selectedStatus);
//     console.log(props.sortByAlphabet);
//     console.log(props.value);
//   }

//   componentDidMount() {
//     this.filteredTodosByStatus = this.props.todos
//   }

//   componentDidUpdate() {
//       if (this.props.value === '') {
//         this.filteredTodosByStatus = this.props.todos.filter((todo: ITodo) => todo.title.toLowerCase().includes(this.props.value.toLowerCase()))
//       }
//     }
//   }


//   render() {
//     return(
//       <div className="App">
//         {false ? <CircularProgress className='loaderTodos'/> : (sortedTodosByAlphabet.map((todo: ITodo) => (
//           <TodoCard key={todo.id} showForm={this.props.showForm} todo={todo} />
//         )))}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state: any) => ({
//   todos: todosSelector(state),
//   // loading: loaderSelector(state)
// })

// const mapDispatchToProps = (dispatch: any) => ({
 
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ToDoItems);

export const ToDoItems: FC<IProps> = ({
  value,
  showForm,
  selectedStatus,
  sortByAlphabet,
}) => {
  const todos = useSelector(todosSelector)
  const loading = useSelector(loaderSelector)

  const filteredTodosByStatus = useMemo(() => {
    if (value === '') return todos

    return todos.filter((todo: ITodo) => todo.title.toLowerCase().includes(value.toLowerCase()))

  }, [todos, selectedStatus, value])

  const sortedTodosByAlphabet = useMemo(() => {
    if (sortByAlphabet === 'default') {
      return filteredTodosByStatus
    }
    const sortedArray = [...filteredTodosByStatus].sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    )
    if (sortByAlphabet === 'asc') {
      return sortedArray
    }
    return sortedArray.reverse()
  }, [sortByAlphabet, filteredTodosByStatus])



  return (
    <div className="App">
      {loading ? <CircularProgress className='loaderTodos'/> : (sortedTodosByAlphabet.map((todo: ITodo) => (
        <TodoCard key={todo.id} showForm={showForm} todo={todo} />
      )))}
   
    </div>
  )
}
