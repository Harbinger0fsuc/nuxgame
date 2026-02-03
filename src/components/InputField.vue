<template>
  <div class="input">
    <input class="input__itself" :type="type" :name="name" :placeholder="placeholder" v-model="modelValue"
      @input="onInput">
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel();

defineProps<{
  type: string;
  name: string;
  placeholder: string;
  onInput: (e: InputEvent) => void;
}>();
</script>

<style scoped>
.input__itself {
  width: 100%;
  padding: 15px;
}
</style>
