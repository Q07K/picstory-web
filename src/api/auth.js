import apiClient from './client'
import { API_ENDPOINTS } from './config'

/**
 * 인증 관련 API 함수들
 */
export const authApi = {
  /**
   * 로그인
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise} - 로그인 응답
   */
  async login(email, password) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password
    })

    // 토큰이 있으면 자동으로 저장
    if (response.success && response.data) {
      const { access_token, refresh_token } = response.data
      apiClient.setTokens(access_token, refresh_token)
    }

    return response
  },

  /**
   * 회원가입
   * @param {string} username - 사용자명
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @param {string} invitationCode - 초대 코드
   * @returns {Promise} - 회원가입 응답
   */
  async register(username, email, password, invitationCode) {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
      username,
      email,
      password,
      invitation_code: invitationCode
    })
  },

  /**
   * 토큰 갱신
   * @returns {Promise} - 토큰 갱신 응답
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token')

    if (!refreshToken) {
      throw new Error('Refresh token이 없습니다.')
    }

    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken
    })

    // 새로운 토큰 저장
    if (response.success && response.data) {
      const { access_token, refresh_token } = response.data
      apiClient.setTokens(access_token, refresh_token)
    }

    return response
  },

  /**
   * 로그아웃
   */
  logout() {
    apiClient.clearTokens()
  },

  /**
   * 로그인 상태 확인
   * @returns {boolean} - 로그인 여부
   */
  isLoggedIn() {
    const token = localStorage.getItem('access_token')
    return !!token
  }
}
