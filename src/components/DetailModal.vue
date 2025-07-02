<template>
  <div class="modal-overlay" @click="$emit('close')">
    <!-- Previous Button -->
    <button 
      v-if="imageList.length > 1"
      @click.stop="$emit('previous')" 
      class="nav-button prev-button"
    >
      <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    
    <!-- Next Button -->
    <button 
      v-if="imageList.length > 1"
      @click.stop="$emit('next')" 
      class="nav-button next-button"
    >
      <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
    
    <div class="modal-content" @click.stop>
      <!-- Image -->
      <div class="image-container">
        <img :src="currentImage.src" :alt="currentImage.alt" class="modal-image">
      </div>
      
      <!-- Info -->
      <div class="info-container">
        <!-- User Info -->
        <div class="user-info">
          <img src="https://placehold.co/48x48/1e293b/FFFFFF?text=JD" class="user-avatar">
          <div class="user-details">
            <p class="user-name">{{ currentImage.author || 'John Doe' }}</p>
            <p class="user-username">@{{ (currentImage.author || 'johndoe').toLowerCase().replace(' ', '') }}</p>
          </div>
        </div>
        
        <!-- Photo Details -->
        <div class="photo-details">
          <h3 class="photo-title">{{ currentImage.title || 'Beautiful Photo' }}</h3>
          <p class="photo-description">
            {{ currentImage.description || 'A beautiful moment captured in time. This image tells a story of nature\'s magnificence and the photographer\'s keen eye for detail.' }}
          </p>
        </div>
        
        <!-- Actions & Stats -->
        <div class="actions-stats">
          <div class="stats">
            <div class="stat">
              <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.18l.879-1.528A1.65 1.65 0 013.437 7h13.126c1.062 0 1.92.714 2.248 1.754l.879 1.528a1.651 1.651 0 010 1.18l-.879 1.528A1.65 1.65 0 0116.563 13H3.437a1.65 1.65 0 01-1.894-1.144L.664 10.59zM10 15a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" clip-rule="evenodd" />
              </svg>
              <span>{{ views }} Views</span>
            </div>
            <button @click="toggleLike" class="like-button" :class="{ liked: isLiked }">
              <svg class="like-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21.56l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
              <span>{{ likeCount }}</span>
            </button>
          </div>
          <button class="download-button">다운로드</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailModal',
  props: {
    imageData: {
      type: Object,
      required: true
    },
    imageList: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isLiked: false,
      likeCount: 182,
      views: '1,204'
    }
  },
  computed: {
    currentImage() {
      return this.imageData || {}
    }
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked
      this.likeCount += this.isLiked ? 1 : -1
    }
  },
  mounted() {
    // ESC 키로 모달 닫기
    this.handleKeydown = (e) => {
      if (e.key === 'Escape') {
        this.$emit('close')
      } else if (e.key === 'ArrowLeft') {
        this.$emit('previous')
      } else if (e.key === 'ArrowRight') {
        this.$emit('next')
      }
    }
    
    document.addEventListener('keydown', this.handleKeydown)
  },
  
  beforeUnmount() {
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    if (this.handleKeydown) {
      document.removeEventListener('keydown', this.handleKeydown)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.nav-button {
  position: absolute;
  z-index: 60;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

.prev-button {
  left: 1rem;
}

.next-button {
  right: 1rem;
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.modal-content {
  background-color: #1f2937;
  width: 100%;
  max-width: 80rem;
  max-height: 90vh;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 2px solid white;
}

.image-container {
  flex: 2;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.info-container {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  min-width: 320px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #374151;
}

.user-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
}

.user-name {
  font-weight: bold;
  color: white;
}

.user-username {
  font-size: 0.875rem;
  color: #9ca3af;
}

.photo-details {
  flex-grow: 1;
  overflow-y: auto;
}

.photo-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
}

.photo-description {
  color: #d1d5db;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.actions-stats {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #374151;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.375rem;
}

.like-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.3s ease;
}

.like-button:hover {
  color: #ef4444;
}

.like-button.liked {
  color: #ef4444;
}

.like-button.liked .like-icon {
  fill: #ef4444;
}

.like-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.375rem;
}

.download-button {
  width: 100%;
  background-color: #f59e0b;
  color: #111827;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-button:hover {
  background-color: #d97706;
}

@media (min-width: 768px) {
  .modal-content {
    flex-direction: row;
  }
  
  .image-container {
    width: 66.666667%;
  }
  
  .info-container {
    width: 33.333333%;
  }
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .info-container {
    min-width: auto;
  }
  
  .nav-button {
    padding: 0.5rem;
  }
  
  .nav-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
