import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../types/index'

export const useUsersStore = defineStore('usersStore', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const user = ref<User | null>(null)
  const loadingUser = ref(false)
  const errorUser = ref<string | null>(null)

  const getUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      users.value = await response.json()
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  const getSingleUser = async (id: string) => {
    loadingUser.value = true
    errorUser.value = null

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      user.value = await response.json()
    } catch (err) {
      errorUser.value = (err as Error).message
      console.error('Error fetching user:', err)
    } finally {
      loadingUser.value = false
    }
  }

  return { users, loading, getUsers, user, loadingUser, errorUser, getSingleUser }
})
