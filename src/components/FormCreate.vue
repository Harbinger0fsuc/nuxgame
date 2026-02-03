<template>
  <form @submit.prevent="handleTodoCreate" class="form-create">
    <div class="form-create__row">
      <label for="userId">Enter user id (max 10)</label>
      <input type="number" class="form-create__input" name="userId" id="userId" v-model="userId"
        placeholder="Enter user id" max="10" min="1">
    </div>

    <div class="form-create__row">
      <label for="title">Enter some title</label>
      <input type="text" class="form-create__input" name="title" id="title" v-model="title"
        placeholder="Enter todo's title">
    </div>

    <ButtonMain>Create todo</ButtonMain>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '@/stores/TodosStore';
import ButtonMain from './ButtonMain.vue';

const todosStore = useTodosStore();
const { addTodo } = todosStore;
const userId = ref(1);
const title = ref("");

const handleTodoCreate = async () => {
  if (!userId.value || !title.value) {
    alert("All fields must be field")

    return
  }

  await addTodo(userId.value, title.value)
  userId.value = 1
  title.value = ""
}
</script>

<style scoped>
.form-create,
.form-create__row {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-create {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: cadetblue;
}

.form-create__input {
  padding: 10px;
}
</style>
