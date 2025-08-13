// API 설정
export const API_CONFIG = {
  // 환경 변수에서 BASE_URL 가져오기, 없으면 기본값 사용
  BASE_URL:
    process.env.VUE_APP_API_BASE_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://api.picstory.com'
      : 'http://localhost:8000'),

  // API 버전
  API_VERSION: 'v1',

  // 요청 타임아웃 (ms) - 환경 변수에서 가져오기
  TIMEOUT: parseInt(process.env.VUE_APP_API_TIMEOUT) || 10000,

  // 기본 헤더
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  }
}

// API 엔드포인트
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login-json',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh'
  }
}
