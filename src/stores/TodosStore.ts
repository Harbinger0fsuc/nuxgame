import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '../types/index'

export const useTodosStore = defineStore('todosStore', () => {
  // A single user's todo
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // All todos
  const allTodos = ref<Todo[]>([])
  const loadingAllTodos = ref(false)
  const errorAllTodos = ref<string | null>(null)

  // Filters
  const statusFilter = ref('all')
  const userIdFilter = ref('all')
  const searchQuery = ref('')

  // Favourites todos' ids
  const favTodosIds = ref<number[]>(JSON.parse(localStorage.getItem('favIds') || '[]'))

  const getUserTodos = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch users todos')
      }

      todos.value = await response.json()
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error fetching users todos:', err)
    } finally {
      loading.value = false
    }
  }

  const getAllTodos = async () => {
    loadingAllTodos.value = true
    errorAllTodos.value = null

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')

      if (!response.ok) {
        throw new Error('Failed to fetch all todos')
      }

      const data = await response.json()
      allTodos.value = data.map((todo: Todo) => {
        return { ...todo, favourite: false }
      })
    } catch (err) {
      errorAllTodos.value = (err as Error).message
      console.error('Error fetching all todos:', err)
    } finally {
      loadingAllTodos.value = false
    }
  }

  const uniqueUsersId = computed(() => [
    ...new Set(
      allTodos.value.map((todo) => {
        return todo.userId
      }),
    ),
  ])

  const getFilteredTodos = computed(() => {
    return allTodos.value.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesStatusFilter =
        statusFilter.value === 'all' ||
        (statusFilter.value === 'completed' && todo.completed) ||
        (statusFilter.value === 'uncompleted' && !todo.completed) ||
        (statusFilter.value === 'favourite' && todo.favourite)

      const matchesUserIdFilter = userIdFilter.value === 'all' || userIdFilter.value === todo.userId

      return matchesSearch && matchesStatusFilter && matchesUserIdFilter
    })
  })

  const addTodo = async (userId: number, title: string) => {
    const newTodo: Todo = {
      userId: userId + '',
      title,
      completed: false,
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to add todo')
      }

      const addedTodo = await response.json()

      allTodos.value.push(addedTodo)
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const addFavTodoId = (id: number) => {
    const alreadyAdded = favTodosIds.value.some((favId) => favId === id)

    if (alreadyAdded) {
      alert('The todo was already added ')
    } else {
      favTodosIds.value.push(id)
      localStorage.setItem('favIds', JSON.stringify(favTodosIds.value))
    }
  }

  return {
    todos,
    loading,
    error,
    getUserTodos,
    loadingAllTodos,
    errorAllTodos,
    allTodos,
    getAllTodos,
    getFilteredTodos,
    statusFilter,
    userIdFilter,
    searchQuery,
    uniqueUsersId,
    addTodo,
    addFavTodoId,
    favTodosIds,
  }
})
