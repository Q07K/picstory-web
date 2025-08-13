<template>
  <div class="login-page">
    <div class="login-container">
      <img src="@/assets/logo.png" alt="Picstory" class="logo" />
      <p class="subtitle">당신의 이야기를 사진으로</p>

      <div class="login-form">
        <h2>로그인</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <input
              type="email"
              placeholder="이메일"
              v-model="email"
              :disabled="isLoading"
              required
            />
          </div>
          <div class="input-group">
            <input
              type="password"
              placeholder="비밀번호"
              v-model="password"
              :disabled="isLoading"
              required
            />
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="login-btn" :disabled="isLoading">
            <span v-if="isLoading">로그인 중...</span>
            <span v-else>로그인</span>
          </button>
        </form>
        <p class="signup-link">
          계정이 없으신가요?
          <button @click="$emit('navigate', 'signup')" class="link-btn">
            회원가입
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { authApi } from '@/api'

  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
        isLoading: false,
        errorMessage: ''
      }
    },
    methods: {
      async handleLogin() {
        this.isLoading = true
        this.errorMessage = ''

        try {
          const response = await authApi.login(this.email, this.password)

          if (response.success) {
            // 로그인 성공 시 피드 페이지로 이동
            this.$emit('navigate', 'feed')
          } else {
            this.errorMessage = response.message || '로그인에 실패했습니다.'
          }
        } catch (error) {
          console.error('Login error:', error)

          // API 에러인 경우
          if (error.name === 'ApiError') {
            if (error.status === 401) {
              this.errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.'
            } else if (error.status === 408) {
              this.errorMessage =
                '요청 시간이 초과되었습니다. 다시 시도해주세요.'
            } else {
              this.errorMessage = error.message || '로그인에 실패했습니다.'
            }
          } else {
            this.errorMessage =
              '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
          }
        } finally {
          this.isLoading = false
        }
      }
    }
  }
</script>

<style scoped>
  .login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #111827;
    padding: 1rem;
  }

  .login-container {
    width: 100%;
    max-width: 28rem;
    text-align: center;
  }

  .logo {
    height: 10rem;
    width: auto;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #9ca3af;
    margin-bottom: 2rem;
  }

  .login-form {
    background-color: #1f2937;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .login-form h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: white;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .input-group input {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #374151;
    border-radius: 0.5rem;
    border: none;
    color: white;
    font-size: 1rem;
  }

  .input-group input::placeholder {
    color: #9ca3af;
  }

  .input-group input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #f59e0b;
  }

  .login-btn {
    width: 100%;
    background-color: #f59e0b;
    color: #111827;
    font-weight: bold;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(1);
  }

  .login-btn:hover {
    background-color: #d97706;
    transform: scale(1.05);
  }

  .login-btn:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
    transform: none;
  }

  .login-btn:disabled:hover {
    background-color: #6b7280;
    transform: none;
  }

  .error-message {
    background-color: #fef2f2;
    color: #dc2626;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #fecaca;
    font-size: 0.875rem;
  }

  .signup-link {
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #9ca3af;
  }

  .link-btn {
    background: none;
    border: none;
    color: #f59e0b;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }

  .link-btn:hover {
    color: #d97706;
  }

  @media (max-width: 768px) {
    .logo {
      height: 3rem;
    }

    .login-form {
      padding: 1.5rem;
    }
  }
</style>
