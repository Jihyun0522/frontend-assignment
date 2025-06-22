import { createRouter, createWebHistory } from 'vue-router'
import IssueList from '../pages/IssueList.vue'
import IssueForm from '../pages/IssueForm.vue'
import IssueCreatePage from '../pages/IssueCreatePage.vue'
import IssueEditPage from '../pages/IssueEditPage.vue'


const routes = [
  {
    path: '/',
    redirect: '/issues',
  },
  {
    path: '/issues',
    name: 'IssueList',
    component: IssueList,
  },
  {
    path: '/issues/new',
    component: IssueCreatePage,
  },
  {
    path: '/issues/:id',
    component: IssueEditPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
