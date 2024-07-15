<template>
  <header>
    <hgroup>
      <em>{{ today }}</em>
    </hgroup>
  </header>

  <TodoListContainer />
</template>

<script setup lang="ts">
import { inject } from "vue";
import TodoListContainer from "./components/TodoListContainer.vue";

const today: string | undefined = inject("today");
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
