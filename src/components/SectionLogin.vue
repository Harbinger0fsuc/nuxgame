<template>
  <section class="section-login section-py">
    <div class="container">
      <div class="section-login__inner">
        <h1 class="text-center section-login__title">Here is a form to login in your app.</h1>

        <FormLogin />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FormLogin from './FormLogin.vue';
</script>

<style scoped>
.section-login__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
