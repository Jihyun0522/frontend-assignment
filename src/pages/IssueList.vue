<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">이슈 목록</h1>

    <!-- 필터 -->
    <div class="mb-4">
      <label class="mr-2">상태 필터:</label>
      <select v-model="statusFilter" class="border rounded px-2 py-1">
        <option value="">전체</option>
        <option value="PENDING">대기</option>
        <option value="IN_PROGRESS">진행 중</option>
        <option value="COMPLETED">완료</option>
        <option value="CANCELLED">취소</option>
      </select>
    </div>

    <!-- 목록 -->
    <ul class="space-y-2">
      <li
        v-for="issue in filteredIssues"
        :key="issue.id"
        class="p-4 border rounded hover:bg-gray-50 cursor-pointer"
        @click="goToDetail(issue.id)"
      >
        <div class="font-semibold">{{ issue.title }}</div>
        <div class="text-sm text-gray-600">
          상태: {{ issue.status }} |
          담당자: {{ issue.user?.name || '없음' }} |
          생성일: {{ formatDate(issue.createdAt) }}
        </div>
      </li>
    </ul>

    <!-- 생성 버튼 -->
    <div class="mt-6">
      <button @click="goToCreate" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        + 새 이슈 생성
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { issues } from '../data/mockData'

const router = useRouter()
const statusFilter = ref('')

// 필터링된 이슈 목록
const filteredIssues = computed(() => {
  return statusFilter.value
    ? issues.filter((i) => i.status === statusFilter.value)
    : issues
})

// 상세 페이지 이동
const goToDetail = (id) => {
  router.push(`/issues/${id}`)
}

// 생성 페이지 이동
const goToCreate = () => {
  router.push('/issues/new')
}

// 날짜 포맷 함수
const formatDate = (iso) => {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
