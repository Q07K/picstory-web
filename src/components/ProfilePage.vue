<template>
  <div class="profile-page">
    <!-- Header -->
    <AppHeader
      currentPage="profile"
      @navigate="handleNavigate"
      @search="handleSearch"
    />

    <main class="main-content">
      <!-- Profile Header -->
      <div class="profile-header">
        <img
          src="https://placehold.co/128x128/334155/FFFFFF?text=Me"
          class="profile-avatar"
          alt="Profile"
        />
        <div class="profile-info">
          <h2 class="profile-name">Your Name</h2>
          <p class="profile-username">@yourusername</p>
          <div class="profile-stats">
            <div class="stat">
              <span class="stat-number">128</span>
              <span class="stat-label">Photos</span>
            </div>
            <div class="stat">
              <span class="stat-number">1.2k</span>
              <span class="stat-label">Followers</span>
            </div>
            <div class="stat">
              <span class="stat-number">340</span>
              <span class="stat-label">Following</span>
            </div>
          </div>
          <button class="edit-profile-btn">프로필 편집</button>
        </div>
      </div>

      <!-- Uploaded Photos -->
      <h3 class="section-title">업로드한 사진</h3>
      <div class="photo-grid">
        <div
          v-for="(image, index) in userImages"
          :key="index"
          class="photo-item"
          @click="openImage(image, index)"
        >
          <img :src="image.src" :alt="image.alt" class="photo" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import AppHeader from './Header.vue'

  export default {
    name: 'ProfilePage',
    components: {
      AppHeader
    },
    data() {
      return {
        userImages: [
          {
            src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070',
            alt: '우주 사진',
            title: 'Space Galaxy',
            author: 'Your Name'
          },
          {
            src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
            alt: '지구 사진',
            title: 'Earth from Space',
            author: 'Your Name'
          },
          {
            src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
            alt: '지구 사진',
            title: 'Blue Planet',
            author: 'Your Name'
          }
        ]
      }
    },
    methods: {
      openImage(image, index) {
        this.$emit('openModal', image, this.userImages, index)
      },
      handleNavigate(page) {
        this.$emit('navigate', page)
      },
      handleSearch(query) {
        // 검색 로직 구현
        console.log('Search query:', query)
      }
    }
  }
</script>

<style scoped>
  .profile-page {
    min-height: 100vh;
    background-color: #111827;
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem 2rem;
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
  }

  .profile-avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: 4px solid #374151;
    margin-bottom: 1rem;
  }

  .profile-info {
    flex-grow: 1;
  }

  .profile-name {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .profile-username {
    color: #9ca3af;
    margin-bottom: 1rem;
  }

  .profile-stats {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    font-weight: bold;
    font-size: 1.25rem;
  }

  .stat-label {
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .edit-profile-btn {
    padding: 0.5rem 1rem;
    background-color: #374151;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .edit-profile-btn:hover {
    background-color: #4b5563;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .photo-item {
    cursor: pointer;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .photo-item:hover {
    transform: scale(1.02);
  }

  .photo {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    .profile-header {
      flex-direction: row;
      text-align: left;
      gap: 2rem;
    }

    .profile-avatar {
      margin-bottom: 0;
    }

    .profile-stats {
      justify-content: flex-start;
    }
  }

  @media (max-width: 768px) {
    .photo-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    .photo {
      height: 200px;
    }
  }
</style>
