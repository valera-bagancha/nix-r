import { useSelector } from 'react-redux'
import { FC, useMemo } from 'react'
import { CircularProgress } from '@mui/material'
import { TodoCard } from './ToDoCard'
import { ITodo } from '../types'
import { loaderSelector, todosSelector } from '../redux/todos/todoSelectors'

interface IProps {
  showForm: () => void
  selectedStatus: string
  sortByAlphabet: string
  value: string
}

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
