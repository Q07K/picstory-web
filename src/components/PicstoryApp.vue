<template>
  <div id="app-container">
    <!-- 로그인 페이지 -->
    <LoginPage 
      v-if="currentPage === 'login'" 
      @navigate="navigateTo" 
    />
    
    <!-- 회원가입 페이지 -->
    <SignupPage 
      v-if="currentPage === 'signup'" 
      @navigate="navigateTo" 
    />
    
    <!-- 피드 페이지 -->
    <FeedPage 
      v-if="currentPage === 'feed'" 
      @navigate="navigateTo"
      @openModal="openDetailModal"
    />
    
    <!-- 프로필 페이지 -->
    <ProfilePage 
      v-if="currentPage === 'profile'" 
      @navigate="navigateTo"
      @openModal="openDetailModal"
    />
    
    <!-- 갤러리 페이지 -->
    <GalleryPage 
      v-if="currentPage === 'gallery'" 
      @navigate="navigateTo"
    />
    
    <!-- 상세 보기 모달 -->
    <DetailModal 
      v-if="showModal"
      :imageData="selectedImage"
      :imageList="imageList"
      :currentIndex="currentImageIndex"
      @close="closeDetailModal"
      @previous="showPreviousImage"
      @next="showNextImage"
    />
  </div>
</template>

<script>
import LoginPage from './LoginPage.vue'
import SignupPage from './SignupPage.vue'
import FeedPage from './FeedPage.vue'
import ProfilePage from './ProfilePage.vue'
import GalleryPage from './GalleryPage.vue'
import DetailModal from './DetailModal.vue'

export default {
  name: 'PicstoryApp',
  components: {
    LoginPage,
    SignupPage,
    FeedPage,
    ProfilePage,
    GalleryPage,
    DetailModal
  },
  data() {
    return {
      currentPage: 'login',
      showModal: false,
      selectedImage: null,
      currentImageIndex: 0,
      imageList: []
    }
  },
  methods: {
    navigateTo(pageId) {
      this.currentPage = pageId
      window.scrollTo(0, 0)
      this.updateImageList()
    },
    
    openDetailModal(imageData, imageList, index) {
      this.selectedImage = imageData
      this.imageList = imageList
      this.currentImageIndex = index
      this.showModal = true
    },
    
    closeDetailModal() {
      this.showModal = false
      this.selectedImage = null
    },
    
    showPreviousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
        this.selectedImage = this.imageList[this.currentImageIndex]
      }
    },
    
    showNextImage() {
      if (this.currentImageIndex < this.imageList.length - 1) {
        this.currentImageIndex++
        this.selectedImage = this.imageList[this.currentImageIndex]
      }
    },
    
    updateImageList() {
      // 페이지 변경 시 이미지 목록 업데이트 로직
    }
  },
  
  mounted() {
    // ESC 키로 모달 닫기, 좌우 화살표 키로 네비게이션
    window.addEventListener('keydown', (e) => {
      if (this.showModal) {
        if (e.key === 'Escape') {
          this.closeDetailModal()
        } else if (e.key === 'ArrowLeft') {
          this.showPreviousImage()
        } else if (e.key === 'ArrowRight') {
          this.showNextImage()
        }
      }
    })
  }
}
</script>

<style scoped>
#app-container {
  min-height: 100vh;
}
</style>
