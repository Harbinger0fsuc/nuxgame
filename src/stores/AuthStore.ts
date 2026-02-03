import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  const username = ref('')
  const phone = ref('')

  return { username, phone }
})
