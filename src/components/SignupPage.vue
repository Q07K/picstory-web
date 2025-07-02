<template>
  <div class="signup-page">
    <div class="signup-container">
      <h1 class="logo">Picstory</h1>
      <p class="subtitle">새로운 여정을 시작하세요</p>
      
      <div class="signup-form">
        <h2>회원가입</h2>
        <form @submit.prevent="handleSignup">
          <div class="input-group">
            <input 
              type="text" 
              placeholder="이름" 
              v-model="name"
              required
            >
          </div>
          <div class="input-group">
            <input 
              type="email" 
              placeholder="이메일" 
              v-model="email"
              required
            >
          </div>
          <div class="input-group">
            <input 
              type="password" 
              placeholder="비밀번호" 
              v-model="password"
              required
            >
          </div>
          <div class="input-group">
            <input 
              type="password" 
              placeholder="초대 코드" 
              v-model="inviteCode"
              required
            >
          </div>
          <button type="submit" class="signup-btn">
            회원가입
          </button>
        </form>
        <p class="login-link">
          이미 계정이 있으신가요? 
          <button @click="$emit('navigate', 'login')" class="link-btn">로그인</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      inviteCode: ''
    }
  },
  methods: {
    handleSignup() {
      // 회원가입 로직 (임시로 바로 피드로 이동)
      this.$emit('navigate', 'feed')
    }
  }
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #111827;
  padding: 1rem;
}

.signup-container {
  width: 100%;
  max-width: 28rem;
  text-align: center;
}

.logo {
  font-size: 3rem;
  font-weight: bold;
  color: #f59e0b;
  margin-bottom: 0.5rem;
  font-family: 'Times New Roman', serif;
}

.subtitle {
  color: #9ca3af;
  margin-bottom: 2rem;
}

.signup-form {
  background-color: #1f2937;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.signup-form h2 {
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

.signup-btn {
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

.signup-btn:hover {
  background-color: #d97706;
  transform: scale(1.05);
}

.login-link {
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
    font-size: 2.5rem;
  }
  
  .signup-form {
    padding: 1.5rem;
  }
}
</style>
