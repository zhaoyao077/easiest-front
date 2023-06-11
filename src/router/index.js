import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ColAnalyzeView from '../views/ColAnalyzeView.vue'
import ModeAnalyzeView from '../views/ModeAnalyzeView.vue'
import ShowOutcomeView from '@/views/ShowOutcome'
import ShowNotesView from '@/views/ShowNotes'
import ShowDetailsView from '@/views/ShowDetailsView'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/colAnalyze',
    name: 'colAnalyze',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component : ColAnalyzeView
  },
  {
    path:'/modeAnalyze',
    name:'modeAnalyze',
    component : ModeAnalyzeView
  },
  {
    path:'/showOutcome',
    name:'showOutcome',
    component: ShowOutcomeView
  },
  {
    path:'/showNotes',
    name:'showNotes',
    component :ShowNotesView
  },
  {
    path :'/showDetails',
    name:'showDetails',
    component:ShowDetailsView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
