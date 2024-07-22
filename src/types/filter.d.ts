import { Ref } from "vue";
import { Todo } from "./todo";

export interface Filter {
  str: string;
  func: (todos: Ref<Todo[]>) => Todo[];
  category: boolean;
}
