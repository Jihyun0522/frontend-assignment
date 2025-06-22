<template>
  <div class="issue-list-wrapper">
    <h1 class="issue-list-title">이슈 목록</h1>

    <div class="filter-group">
      <label class="filter-label" for="statusFilter">상태 필터:</label>
      <select id="statusFilter" v-model="statusFilter" class="filter-select">
        <option value="">전체</option>
        <option value="PENDING">대기</option>
        <option value="IN_PROGRESS">진행 중</option>
        <option value="COMPLETED">완료</option>
        <option value="CANCELLED">취소</option>
      </select>
    </div>

    <ul class="issue-list">
      <li
        v-for="issue in filteredIssues"
        :key="issue.id"
        class="issue-item"
        @click="goToDetail(issue.id)"
      >
        <div class="issue-title">{{ issue.title }}</div>
        <div class="issue-meta">
          상태: {{ issue.status }} |
          담당자: {{ issue.user?.name || '없음' }} |
          생성일: {{ formatDate(issue.createdAt) }}
        </div>
      </li>
    </ul>

    <div class="create-button-container">
      <button @click="goToCreate" class="create-button">
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
<style src="./css/IssueList.css" scoped></style>
