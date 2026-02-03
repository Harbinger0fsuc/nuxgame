<template>
  <ul class="todos-list list-reset">
    <li v-for="todo in todos" :key="todo.id" class="todos-list__item">
      <h3>{{ todo.title }}</h3>
      <button v-if="'favourite' in todo" @click="handleAddToFav(todo.id!)">
        Add to favourite.
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Todo } from '@/types';

import { useTodosStore } from '@/stores/TodosStore';

const todosStore = useTodosStore();

const { addFavTodoId } = todosStore;

const handleAddToFav = (id: number) => {
  addFavTodoId(id);
}

defineProps<{
  todos: Todo[]
}>();
</script>

<style scoped>
.todos-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.todos-list__item {
  padding: 10px;
  border: 1px solid rebeccapurple;
  border-radius: 5px;
}
</style>
