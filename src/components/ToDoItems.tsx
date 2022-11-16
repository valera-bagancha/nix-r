import { useSelector } from 'react-redux'
import {FC} from 'react'
import { TodoCard } from './ToDoCard'
import { ITodo } from '../types'

interface IProps {
  showForm: () => void;
}

export const ToDoItems: FC<IProps> = ({ showForm }) => {

  const todos = useSelector((state: any) => state.todos.todos)
  
  return(
    <div className="App">
     {todos.map((todo: ITodo) => <TodoCard key={todo.id} showForm={showForm} todo={todo} />)}
    </div>
  )
}