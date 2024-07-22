import { inject, Ref } from "vue";
import { Todo } from "../types/todo";

export const useFilter = () => {
  const today: string = inject("today", "");
  const fnSort = (a: Todo, b: Todo) => {
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);

    if (a_date > b_date) return 1;
    else if (a_date < b_date) return 0;
    else return a.id - b.id;
  };

  const getPendingTodos = (todos: Ref<Todo[]>) => {
    return todos.value
      .filter((todo) => todo.date < today && !todo.completed)
      .slice()
      .sort(fnSort);
  };

  const getActiveTodayTodos = (todos: Ref<Todo[]>) => {
    return todos.value
      .filter((todo) => todo.date === today && !todo.completed)
      .slice()
      .sort(fnSort);
  };

  const getCompletedTodayTodos = (todos: Ref<Todo[]>) => {
    return todos.value
      .filter((todo) => todo.date === today && todo.completed)
      .slice()
      .sort(fnSort);
  };

  const getAllTodayTodos = (todos: Ref<Todo[]>) => {
    return getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .slice()
      .sort(fnSort);
  };

  const getAllTodos = (todos: Ref<Todo[]>) => todos.value.slice().sort(fnSort);

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  };
};
