import { reactive, Ref, toRefs } from "vue";
import { Todo } from "../types/todo";

export const useStorage = () => {
  const KEY = "my-todo-list";
  const storage_obj = reactive({ storage_id: 0 });

  // JSON.parse 후 데이터가 Todo[] 인지 타입체크
  const isTodoArray = (data: unknown): data is Todo[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item.id === "number" &&
          typeof item.job === "string" &&
          typeof item.date === "string" &&
          typeof item.completed === "boolean",
      )
    );
  };

  const loadTodos = (): Todo[] => {
    let todos: Todo[] = [];
    const data = localStorage.getItem(KEY);

    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (isTodoArray(parsedData)) {
          todos = parsedData;
        }
      } catch (err) {
        console.error(`Parse failed ${err}`);
      }
    }

    todos.forEach((todo, idx) => (todo.id = idx));
    storage_obj.storage_id = todos.length;
    return todos;
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
