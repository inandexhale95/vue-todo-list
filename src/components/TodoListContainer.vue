<template>
  <TodoListNew />
  <section class="container">
    <div class="row justify-content-center m-2">
      <TodoListMain />
    </div>
  </section>
</template>

<script setup lang="ts">
import { provide, readonly, Ref, ref } from "vue";
import { Todo } from "../types/todo";
import { useStorage } from "../compositions/localStorage";
import TodoListMain from "./TodoListMain.vue";
import TodoListNew from "./TodoListNew.vue";

const { loadTodos, saveTodos, storage_id } = useStorage();

const todos: Ref<Todo[]> = ref([]);
todos.value = loadTodos();

const addTodo = (job: string, date: string) => {
  todos.value.push({
    id: storage_id.value++,
    job,
    date,
    completed: false,
  });
  saveTodos(todos);
};

const removeTodo = (id: number) => {
  todos.value.splice(id, 1);
  todos.value.forEach((todo, idx) => {
    todo.id = idx;
  });
  saveTodos(todos);
};

const completeTodo = (id: number) => {
  const findTodo = todos.value.find((todo) => todo.id === id);
  if (findTodo) {
    findTodo.completed = true;
    saveTodos(todos);
  }
};

provide("todos", readonly(todos));
provide("addTodo", addTodo);
provide("removeTodo", removeTodo);
provide("completeTodo", completeTodo);
</script>

<style scoped></style>
