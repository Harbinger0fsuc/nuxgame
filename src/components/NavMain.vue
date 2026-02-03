<template>
  <nav class="nav-main">
    <ul class="nav-main__list list-reset">
      <li class="nav-main__item">
        <RouterLink to="/" class="nav-main__link">Home</RouterLink>
      </li>

      <li class="nav-main__item">
        <RouterLink to="/todos" class="nav-main__link">All todos</RouterLink>
      </li>

      <li class="nav-main__item">
        <RouterLink to="/create" class="nav-main__link">Create a todo</RouterLink>
      </li>

      <li class="nav-main__item">
        <RouterLink to="/favourites" class="nav-main__link">Favourites todos</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.nav-main__list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  text-align: center;
}

.nav-main__link.router-link-exact-active {
  color: darkcyan;
}
</style>
