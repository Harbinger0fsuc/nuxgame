<template>
  <section class="section-todos section-py">
    <div class="container">
      <h1>All users' todos go here.</h1>

      <p v-if="loadingAllTodos">Loading alltodos</p>
      <p v-else-if="errorAllTodos">Loading all todos error</p>
      <div v-else>
        <div class="section-todos__filters">
          <div class="section-todos__filter">
            <select name="status" id="status" v-model="statusFilter">
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
              <option value="favourite">Favourites</option>
            </select>
          </div>

          <div class="section-todos__filter">
            <select name="status" id="status" v-model="userIdFilter">
              <option value="all">All Users</option>
              <option v-for="id in uniqueUsersId" :value="id" :key="id">{{ id }}</option>
            </select>
          </div>
        </div>

        <div class="section-todos__search">
          <input type="search" name="search" id="search" v-model="searchQuery" placeholder="Search by title">
        </div>

        <TodosList :todos="getFilteredTodos" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTodosStore } from '@/stores/TodosStore';

import { storeToRefs } from 'pinia';

import { onMounted } from 'vue';

import TodosList from './TodosList.vue';

const todosStore = useTodosStore();

const { loadingAllTodos, errorAllTodos, statusFilter, userIdFilter, searchQuery, uniqueUsersId, getFilteredTodos } = storeToRefs(todosStore);
const { getAllTodos } = todosStore;

onMounted(async () => {
  await getAllTodos();
})
</script>

<style scoped>
.section-todos__filters,
.section-todos__search {
  margin-bottom: 30px;
}

.section-todos__filters {
  display: flex;
  gap: 20px;
}

.section-todos__filter {
  flex: 0 1 50%;
}

.section-todos__filter select {
  width: 100%;
  padding: 10px;
}

.section-todos__search input {
  width: 100%;
  padding: 15px;
}
</style>
