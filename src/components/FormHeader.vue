<template>
  <header class="form-header text-center">
    <h2 class="form-header__title">{{ title }}</h2>
  </header>
</template>

<script setup lang="ts">
const { title = "Header" } = defineProps<{
  title: string;
}>();
</script>

<style scoped>
.form-header {
  background-color: #A5A5A5;
  padding: 15px;
}

.form-header__title {
  margin: 0;
}
</style>
