import axios from 'axios'
import { issues as mockIssues } from '../data/mockData'

const isDev = import.meta.env.VITE_MODE === 'DEV'

// 실제 API 인스턴스 (운영 모드용)
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
})

// 전체 이슈 조회 (상태 필터 포함)
export async function fetchIssues(status) {
  if (isDev) {
    // Mock 데이터 필터링
    if (status) {
      return mockIssues.filter(issue => issue.status === status)
    }
    return mockIssues
  } else {
    // 실제 API 호출
    try {
      const response = await apiClient.get('/issues', {
        params: status ? { status } : {}
      })
      return response.data.issues
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }
}

// 이슈 상세 조회
export async function fetchIssueById(id) {
  if (isDev) {
    const issue = mockIssues.find(issue => issue.id === Number(id))
    if (!issue) throw new Error('이슈를 찾을 수 없습니다.')
    return issue
  } else {
    try {
      const response = await apiClient.get(`/issue/${id}`)
      return response.data
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }
}

// 이슈 생성
export async function createIssue(issueData) {
  if (isDev) {
    // Mock 데이터에 추가 (로컬 메모리 처리)
    const newIssue = {
      id: Math.max(...mockIssues.map(i => i.id)) + 1,
      status: issueData.userId ? 'IN_PROGRESS' : 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: issueData.userId ? { id: issueData.userId, name: '담당자 이름' } : null,
      ...issueData
    }
    mockIssues.push(newIssue)
    return newIssue
  } else {
    try {
      const response = await apiClient.post('/issue', issueData)
      return response.data
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }
}

// 이슈 수정
export async function updateIssue(id, updateData) {
  if (isDev) {
    const issueIndex = mockIssues.findIndex(i => i.id === Number(id))
    if (issueIndex === -1) throw new Error('이슈를 찾을 수 없습니다.')
    mockIssues[issueIndex] = { ...mockIssues[issueIndex], ...updateData, updatedAt: new Date().toISOString() }
    return mockIssues[issueIndex]
  } else {
    try {
      const response = await apiClient.patch(`/issue/${id}`, updateData)
      return response.data
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }
}

// 에러 처리 함수 (통일된 에러 핸들링)
function handleApiError(error) {
  if (error.response) {
    // 서버 응답이 있을 때 (400, 404 등)
    console.error('API Error:', error.response.data)
    alert(`API 오류: ${error.response.data.error || '알 수 없는 오류'}`)
  } else if (error.request) {
    // 요청은 되었으나 응답이 없을 때
    console.error('No response:', error.request)
    alert('서버 응답이 없습니다. 네트워크 상태를 확인하세요.')
  } else {
    // 기타 오류
    console.error('Error:', error.message)
    alert(`오류 발생: ${error.message}`)
  }
}
