<template>
  <section class="section-user section-py">
    <div class="container">
      <h1 class="text-center">User page</h1>

      <p v-if="loadingUser">Loading the user...</p>
      <p v-else-if="errorUser">Error fetching the user. Such user id doesn't exists.</p>
      <div v-else>
        <h2 class="text-center">User info:</h2>

        <ul>
          <li v-if="user?.name"><strong>Name:</strong> {{ user.name }}</li>
          <li v-if="user?.username"><strong>Username:</strong> {{ user.username }}</li>
          <li v-if="user?.email"><strong>Email:</strong> {{ user.email }}</li>
          <li v-if="user?.phone"><strong>Phone:</strong> {{ user.phone }}</li>
        </ul>
      </div>

      <p v-if="loadingTodos">Loading user's todos</p>
      <p v-else-if="errorTodos">Loading user's todos</p>
      <div v-else>
        <h2 v-if="user?.name" class="text-center">{{ user.name }}'s todos:</h2>

        <TodosList :todos />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTodosStore } from '@/stores/TodosStore';
import { useUsersStore } from '@/stores/UsersStore';

import { storeToRefs } from 'pinia';

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import TodosList from './TodosList.vue';


const usersStore = useUsersStore();
const todosStore = useTodosStore();

const { user, loadingUser, errorUser } = storeToRefs(usersStore);
const { getSingleUser } = usersStore;

const { todos, loading: loadingTodos, error: errorTodos } = storeToRefs(todosStore);
const { getUserTodos } = todosStore;

const route = useRoute();
const id = route.params.id as string;

onMounted(async () => {
  await Promise.all([getSingleUser(id), getUserTodos(id)]);
});
</script>

<style scoped></style>
