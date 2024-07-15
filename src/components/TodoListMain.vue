<template>
  <div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
    <div v-if="use_category">
      <em>{{ key }}</em>
    </div>
    <!-- <TodoList :data="filtered_todos[key]" /> -->
  </div>

  <div class="my-2 mt-5">
    <span style="background-color: red">&nbsp;</span>
    <strong>처리하지 못한 작업들</strong>
  </div>
  <TodoList :data="pending_todos" />
</template>

<script setup lang="ts">
import { inject, provide, ref, Ref, watch } from "vue";
import TodoList from "./TodoList.vue";
import { Todo } from "../types/todo";
import { useFilter } from "../compositions/useFilter";

const {
  getPendingTodos,
  getActiveTodayTodos,
  getCompletedTodayTodos,
  getAllTodayTodos,
  getAllTodos,
} = useFilter();

const filter = ref(0);
const filtered_todos: Ref<Todo[]> = ref([]);
const pending_todos: Ref<Todo[]> = ref([]);
const use_category = ref(false);
const todos: Ref<Todo[]> | undefined = inject("todos");

interface Filter {
  str: string;
  func: (todos: Ref<Todo[]>) => Todo[];
  category: boolean;
}

const filters: Record<number, Filter> = {
  0: {
    str: "해야 할 작업들",
    func: getActiveTodayTodos,
    category: false,
  },
  1: {
    str: "완료한 작업들",
    func: getCompletedTodayTodos,
    category: false,
  },
  2: {
    str: "오늘의 모든 기록",
    func: getAllTodayTodos,
    category: false,
  },
  3: {
    str: "모든 작업",
    func: getAllTodos,
    category: true,
  },
};

provide("filters", filters);

// 그룹화 함수
const groupBy = (todos: Todo[]): Record<string, Todo[]> => {
  return todos.reduce((acc: Record<string, Todo[]>, cur: Todo) => {
    if (!acc[cur.date]) {
      acc[cur.date] = [];
    }
    acc[cur.date].push(cur);
    return acc;
  }, {});
};

const onChangeFilter = (filter_idx: string) => {
  filter.value = Number(filter_idx);
};

watch(
  [() => filter.value, () => todos?.value ?? []],
  ([new_filter, new_todos], [old_filter, _]) => {
    pending_todos.value = getPendingTodos(todos!);
    if (typeof new_filter === "number") {
      let temp_todos = filters[new_filter].func(todos!);
      filtered_todos.value = Object.values(groupBy(temp_todos)).flat();
      use_category.value = filters[new_filter].category;
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
