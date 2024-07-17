<template>
  <header>
    <hgroup class="my-5">
      <h1>나의 할일</h1>
      <em>{{ today }}</em>
    </hgroup>
  </header>

  <TodoListContainer />
</template>

<script setup lang="ts">
import { inject } from "vue";
import TodoListContainer from "./components/TodoListContainer.vue";

const today: string = inject("today", "");
</script>

<style scoped>
hgroup {
  text-align: center;
  font-family: Arial;
}

hgroup h1 {
  font-weight: bolder;
}
</style>
