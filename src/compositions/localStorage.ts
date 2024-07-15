import { reactive, Ref, toRefs } from "vue";
import { Todo } from "../types/todo";

export const useStorage = () => {
  const KEY = "my-todo-list";
  const storage_obj = reactive({ storage_id: 0 });
  const loadTodos = (initTodos: (init_todos: Todo[]) => void) => {
    const temp_todos = JSON.parse(localStorage.getItem(KEY) || "[]");
    temp_todos.forEach((todo: Todo, idx: number) => (todo.id = idx));
    storage_obj.storage_id = temp_todos.length;
    initTodos(temp_todos);
  };

  const saveTodos = (todos: Ref<Todo[]>) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  };

  return {
    ...toRefs(storage_obj),
    loadTodos,
    saveTodos,
  };
};
