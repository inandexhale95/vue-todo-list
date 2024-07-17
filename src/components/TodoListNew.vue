<template>
  <section class="md-5">
    <div class="container">
      <div class="row justify-content-center m-2">
        <div class="col border border-primary rounded">
          <input
            type="text"
            id="todo_input"
            class="form-control my-2"
            v-model="val_obj.job"
            placeholder="여기에 할일 적으세요"
          />

          <div class="row my-2">
            <div class="col-6">
              <input type="date" v-model="val_obj.date" :min="today" />
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-primary btn-sm float-end"
                @click="onAddTodo"
              >
                작업추가
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, reactive, toRefs } from "vue";

const today: string = inject("today", "");
const addTodo: (job: string, date: string) => void = inject("addTodo", () => {
  throw new Error("addTodo Inject failed");
});
const val_obj = reactive({
  job: "",
  date: today,
  today,
});
toRefs(val_obj);

const onAddTodo = () => {
  if (val_obj.job.length > 0) {
    addTodo(val_obj.job, val_obj.date);
    val_obj.job = "";
    val_obj.date = today;
  }
};
</script>

<style scoped></style>
