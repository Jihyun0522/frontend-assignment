<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold mb-4">이슈 생성</h2>
    <IssueForm
      v-model="form"
      submit-label="생성"
      @submit="handleSubmit"
      @cancel="goBack"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IssueForm from '../pages/IssueForm.vue'
import { users, issues } from '../data/mockData'

const router = useRouter()

const form = ref({
  title: '',
  description: '',
  status: 'PENDING',
  userId: null,
})

const handleSubmit = () => {
  const newIssue = {
    id: Math.floor(Math.random() * 10000),
    title: form.value.title,
    description: form.value.description,
    status: form.value.userId ? 'IN_PROGRESS' : 'PENDING',
    user: users.find((u) => u.id === Number(form.value.userId)) || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  issues.push(newIssue)
  router.push('/issues')
}

const goBack = () => router.push('/issues')
</script>
