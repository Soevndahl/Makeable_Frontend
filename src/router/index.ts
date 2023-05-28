import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import QuizView from '../views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/easy',
      name: 'easy',
      component: QuizView,
      props: { niveau: "easy"}
    },
    {
      path: '/medium',
      name: 'medium',
      component: QuizView,
      props: { niveau: "medium"}
    },
    {
      path: '/hard',
      name: 'hard',
      component: QuizView,
      props: { niveau: "hard"}
    }
  ]
})

export default router
