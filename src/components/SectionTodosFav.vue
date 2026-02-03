<template>
  <section class="section-todos-fav section-py">
    <div class="container">
      <h1 class="text-center">List of favourites todos by id.</h1>

      <ul v-if="favTodosIds.length > 0">
        <li v-for="id in favTodosIds" :key="id">Fav todo id: {{ id }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTodosStore } from '@/stores/TodosStore';

const todosStore = useTodosStore();

const { favTodosIds } = todosStore;
</script>

<style scoped></style>
