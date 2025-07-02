<template>
  <div class="profile-page">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <button @click="$emit('navigate', 'feed')" class="logo">Picstory</button>
        <div class="search-container">
          <input 
            type="search" 
            placeholder="검색..." 
            v-model="searchQuery"
            class="search-input"
          >
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div class="nav-buttons">
          <button @click="$emit('navigate', 'gallery')" class="nav-btn">Gallery</button>
          <button @click="$emit('navigate', 'profile')" class="profile-btn">
            <img src="https://placehold.co/40x40/334155/FFFFFF?text=Me" class="profile-img" alt="Profile">
          </button>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <!-- Profile Header -->
      <div class="profile-header">
        <img src="https://placehold.co/128x128/334155/FFFFFF?text=Me" class="profile-avatar" alt="Profile">
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
          <img :src="image.src" :alt="image.alt" class="photo">
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      searchQuery: '',
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
    }
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #111827;
}

.header {
  position: sticky;
  top: 0;
  background-color: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(16px);
  z-index: 20;
  border-bottom: 1px solid #374151;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f59e0b;
  font-family: 'Times New Roman', serif;
  background: none;
  border: none;
  cursor: pointer;
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 24rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  background-color: #1f2937;
  border-radius: 9999px;
  color: white;
  border: none;
}

.search-input::placeholder {
  color: #6b7280;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #f59e0b;
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn {
  color: #d1d5db;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-btn:hover {
  color: #f59e0b;
}

.profile-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.profile-img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid #374151;
  transition: border-color 0.3s ease;
}

.profile-img:hover {
  border-color: #f59e0b;
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
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-container {
    order: 2;
  }
  
  .nav-buttons {
    order: 1;
  }
  
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .photo {
    height: 200px;
  }
}
</style>
