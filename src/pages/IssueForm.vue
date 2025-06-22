<template>
  <form @submit.prevent="handleSubmit">
    <!-- 제목 -->
    <div class="mb-4">
      <label class="block font-semibold">제목</label>
      <input v-model="localForm.title" class="w-full border px-3 py-2 rounded" />
    </div>

    <!-- 설명 -->
    <div class="mb-4">
      <label class="block font-semibold">설명</label>
      <textarea v-model="localForm.description" class="w-full border px-3 py-2 rounded" />
    </div>

    <!-- 담당자 -->
    <div class="mb-4">
      <label class="block font-semibold">담당자</label>
      <select
        v-model="localForm.userId"
        :disabled="userDropdownDisabled"
      >
        <option value="">선택 안함</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <!-- 상태 -->
    <div class="mb-4">
      <label class="block font-semibold">상태</label>
      <select
        v-model="localForm.status"
        :disabled="statusDropdownDisabled"
      >
        <option v-for="option in statusOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- 버튼 -->
    <div class="flex gap-2">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ submitLabel }}
      </button>
      <button type="button" @click="$emit('cancel')" class="border px-4 py-2 rounded">
        취소
      </button>
    </div>
  </form>
</template>

<script setup>
/*
  TODO: 이 컴포넌트를 재사용 가능하게 설계해보세요.
  - 같은 폼 구조와 로직을 재사용하여 코드 중복을 방지하세요.
*/
import { ref, computed, watch } from 'vue'
import { users } from '../data/mockData'

// Props & Emits
const props = defineProps({
  modelValue: Object,
  submitLabel: {
    type: String,
    default: '저장',
  },
})
const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

// 폼 상태 초기값
const localForm = ref({
  title: '',
  description: '',
  userId: null,
  status: 'PENDING',
  // 기타 필요한 필드
})

watch(
  () => props.modelValue,
  (newVal) => {
    localForm.value = { ...newVal }
  },
  { deep: true, immediate: true }
)

watch(
  localForm,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)

// 제약 조건 계산
const isCompletedOrCancelled = computed(() =>
  ['COMPLETED', 'CANCELLED'].includes(localForm.value.status)
)

const statusDropdownDisabled = computed(() =>
  !localForm.value.userId || isCompletedOrCancelled.value
)

const userDropdownDisabled = computed(() =>
  isCompletedOrCancelled.value
)

const statusOptions = computed(() => {
  if (isCompletedOrCancelled.value) {
    return [localForm.value.status]
  }
  if (!localForm.value.userId) {
    return ['PENDING']
  }
  return ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
})

// 담당자 최초 지정 시 상태 변경 로직
watch(() => localForm.value.userId, (newUserId, oldUserId) => {
  if (newUserId && !oldUserId && localForm.value.status === 'PENDING') {
    localForm.value.status = 'IN_PROGRESS'
  }
})

// 제출 핸들러
const handleSubmit = () => {
  emit('submit', localForm.value)
}
</script>
<style src="./css/IssueForm.css" scoped></style>