<template>
  <div class="row">
    <div class="col">
      <span style="background-color: blue">&nbsp;</span>
      <strong>{{ state }}</strong>
    </div>
    <div class="col">
      <div class="btn-group float-end">
        <button
          type="button"
          class="btn btn-sm dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          리스트 필터
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="key in Object.keys(filters)" :key="key">
            <a class="dropdown-item" @click="filter = Number(key)">{{
              filters[key].str
            }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref, watch } from "vue";
import { Todo } from "../types/todo";

const emits = defineEmits(["change-filter"]);

interface Filter {
  str: string;
  func: (todos: Ref<Todo[]>) => Todo[];
  category: boolean;
}

const filters: Record<string, Filter> = inject(
  "filters",
  {} as Record<string, Filter>,
);
const filter = ref(0);

const state = computed(() => filters[filter.value].str);

watch(
  () => filter.value,
  (filter) => emits("change-filter", filter),
);
</script>

<style scoped></style>
