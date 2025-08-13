import { API_CONFIG } from './config'

/**
 * API 클라이언트 클래스
 */
class ApiClient {
  constructor() {
    this.baseURL = `${API_CONFIG.BASE_URL}/${API_CONFIG.API_VERSION}`
    this.timeout = API_CONFIG.TIMEOUT
  }

  /**
   * HTTP 요청을 보내는 메서드
   * @param {string} endpoint - API 엔드포인트
   * @param {Object} options - 요청 옵션
   * @returns {Promise} - API 응답 Promise
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    // 기본 옵션 설정
    const defaultOptions = {
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...this.getAuthHeaders()
      },
      ...options
    }

    // AbortController를 사용한 타임아웃 설정
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      // 응답 데이터 파싱
      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.message || 'API 요청이 실패했습니다.',
          data
        )
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        throw new ApiError(408, '요청 시간이 초과되었습니다.')
      }

      if (error instanceof ApiError) {
        throw error
      }

      throw new ApiError(0, '네트워크 오류가 발생했습니다.')
    }
  }

  /**
   * GET 요청
   */
  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`)
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    )

    return this.request(endpoint + url.search, {
      method: 'GET'
    })
  }

  /**
   * POST 요청
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * PUT 요청
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  /**
   * DELETE 요청
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    })
  }

  /**
   * 인증 헤더 가져오기
   */
  getAuthHeaders() {
    const token = localStorage.getItem('access_token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  /**
   * 토큰 저장
   */
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  /**
   * 토큰 제거
   */
  clearTokens() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}

/**
 * API 에러 클래스
 */
class ApiError extends Error {
  constructor(status, message, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// 싱글톤 인스턴스
const apiClient = new ApiClient()

export default apiClient
export { ApiError }
