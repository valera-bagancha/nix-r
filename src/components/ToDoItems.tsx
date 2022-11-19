import { useSelector } from "react-redux";
import { FC, useMemo } from "react";
import { TodoCard } from "./ToDoCard";
import { ITodo } from "../types";

interface IProps {
  showForm: () => void;
  selectedStatus: string;
  sortByDate: string;
}

export const ToDoItems: FC<IProps> = ({
  showForm,
  selectedStatus,
  sortByDate,
}) => {
  const todos = useSelector((state: any) => state.todos.todos);
  const filteredTodosByStatus = useMemo(() => {
    if (selectedStatus === 'default') return todos;

    return todos.filter((todo: ITodo) => todo.status === selectedStatus);
  }, [todos, selectedStatus]);

  const sortedTodosByDate = useMemo(() => {
    if (sortByDate === 'default') return filteredTodosByStatus;

    return [...filteredTodosByStatus].sort(
      (a, b) => b[sortByDate] - a[sortByDate]
    );
  }, [sortByDate, filteredTodosByStatus]);

  return (
    <div className="App">
      {sortedTodosByDate.map((todo: ITodo) => (
        <TodoCard key={todo.id} showForm={showForm} todo={todo} />
      ))}
    </div>
  );
};
