<template>
  <main>
    <div v-for="(todo, idx) in data" :key="todo.id">
      <div class="input-group my-2 input-group-sm">
        <div class="input-group-text">
          <input
            class="form-check-input mt-0"
            type="checkbox"
            :checked="todo.completed"
            :disabled="todo.completed"
            @click="completeTodo && completeTodo(todo.id)"
          />
        </div>
        <div class="input-group-text">
          <input
            class="form-input mt-0"
            type="date"
            :min="today"
            disabled
            :value="todo.date"
          />
        </div>
        <input type="text" class="form-control" :value="todo.job" />
        <button
          class="btn btn-outline-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          할일 관리
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="item in menu" :key="item.str">
            <a class="dropdown-item" @click="item.func && item.func(todo.id)">
              {{ item.str }}
            </a>
          </li>
        </ul>
        <div
          v-show="idx + 1 < data.length"
          class="col border border-second"
        ></div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Todo } from "../types/todo";

defineProps<{ data: Todo[] }>();

const removeTodo: ((id: number) => void) | undefined = inject("removeTodo");
const completeTodo: ((id: number) => void) | undefined = inject("completeTodo");
const today: string | undefined = inject("today");

const menu = [
  {
    str: "할일 삭제",
    func: removeTodo,
  },
  {
    str: "할일 완료",
    func: completeTodo,
  },
];
</script>

<style scoped></style>
