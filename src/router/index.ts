import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import TodosView from '@/views/TodosView.vue'
import CreateTodoView from '@/views/CreateTodoView.vue'
import TodosFavouriteView from '@/views/TodosFavouriteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodosView,
    },
    {
      path: '/create',
      name: 'create-todo',
      component: CreateTodoView,
    },
    {
      path: '/favourites',
      name: 'favourite-todos',
      component: TodosFavouriteView,
    },
  ],
})

export default router
