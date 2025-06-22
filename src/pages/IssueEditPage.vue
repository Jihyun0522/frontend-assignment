<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold mb-4">이슈 수정</h2>
    <IssueForm
      v-model="form"
      submit-label="수정"
      @submit="handleSubmit"
      @cancel="goBack"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IssueForm from '../pages/IssueForm.vue'
import { issues, users } from '../data/mockData'

const route = useRoute()
const router = useRouter()

const form = ref({
  title: '',
  description: '',
  status: 'PENDING',
  userId: null,
})

onMounted(() => {
  const target = issues.find((i) => i.id === Number(route.params.id))
  if (target) {
    form.value = {
      title: target.title,
      description: target.description,
      status: target.status,
      userId: target.user?.id || null,
    }
  }
})

const handleSubmit = () => {
  const idx = issues.findIndex((i) => i.id === Number(route.params.id))
  if (idx !== -1) {
    issues[idx] = {
      ...issues[idx],
      title: form.value.title,
      description: form.value.description,
      status: form.value.status,
      user: users.find((u) => u.id === Number(form.value.userId)) || null,
      updatedAt: new Date().toISOString(),
    }
  }
  router.push('/issues')
}

const goBack = () => router.push('/issues')
</script>
