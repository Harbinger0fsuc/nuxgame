<template>
  <RouterLink v-if="$attrs.to" :to="$attrs.to" :class="['button-main', variant]">
    <slot />
  </RouterLink>
  <button v-else :class="['button-main', variant]">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const { variant = "primary" } = defineProps<{
  variant?: string;
}>();
</script>

<style scoped>
.button-main {
  cursor: pointer;
  padding: 15px 20px;
  border: none;
  font-weight: 700;
}

.button-main.primary {
  background-color: #519945;
}
</style>
