<template>
  <HeaderMain />

  <RouterView />
</template>

<script setup lang="ts">
import HeaderMain from './components/HeaderMain.vue';

import { RouterView } from 'vue-router'
</script>
