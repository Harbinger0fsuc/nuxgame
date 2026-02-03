<template>
  <form @submit.prevent="handleSubmit" class="form-login">
    <FormHeader title="Header" />

    <div class="form-login__body">
      <InputField type="text" name="username" placeholder="Username" v-model="username" :onInput="handleInputText" />

      <InputField type="tel" name="tel" placeholder="Phone" v-model="phone" :onInput="handleInputTel" />

      <ButtonMain>Login</ButtonMain>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import FormHeader from './FormHeader.vue';
import InputField from './InputField.vue';
import ButtonMain from './ButtonMain.vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';
import { useUsersStore } from '@/stores/UsersStore';

import { filterLettersOnly } from '@/utils/filterLettersOnly';
import { filterNumbersOnly } from '@/utils/filterNumbersOnly';

const router = useRouter();

const authStore = useAuthStore();
const { username, phone } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
const { getUsers } = usersStore;

const handleInputText = (e: InputEvent) => {
  const value = (e.target as HTMLInputElement).value;
  const valueFiltered = filterLettersOnly(value);

  username.value = valueFiltered;
}

const handleInputTel = (e: InputEvent) => {
  const value = (e.target as HTMLInputElement).value;
  const valueFiltered = filterNumbersOnly(value);

  phone.value = valueFiltered;
}

const handleSubmit = async () => {
  if (!username.value.trim() || !phone.value.trim()) {
    alert("All fields must be filled");

    return;
  }

  await getUsers();

  const separator = " x";
  // 1-770-736-8031 - correct format.
  const user = users.value.filter((user) => user.username === username.value && user.phone.slice(0, user.phone.indexOf(separator)) === phone.value);

  if (user && user.length > 0) {
    const userId = user[0]?.id;

    router.push(`/user/${userId}`);

    username.value = "";
    phone.value = "";
  } else {
    alert("Login Error. Credentials aren't correct");
  }
}
</script>

<style scoped>
.form-login {
  width: 100%;
  max-width: 447px;
  background-color: #C3C3C3;
  border-radius: 5px;
  overflow: hidden;
}

.form-login__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px 25px;
}
</style>
