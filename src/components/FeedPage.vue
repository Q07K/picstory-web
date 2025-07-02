<template>
  <div class="feed-page">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <h1 class="logo" @click="$emit('navigate', 'feed')">Picstory</h1>
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

    <!-- Photo Grid -->
    <main class="main-content">
      <div class="photo-grid">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="photo-item"
          @click="openImage(image, index)"
        >
          <img :src="image.src" :alt="image.alt" class="photo">
          <div class="photo-overlay">
            <div class="photo-info">
              <h3>{{ image.title }}</h3>
              <p>{{ image.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'FeedPage',
  data() {
    return {
      searchQuery: '',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070',
          alt: '풍경 사진',
          title: 'Mountain Vista',
          author: 'John Doe'
        },
        {
          src: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2070',
          alt: '호수 사진',
          title: 'Serene Lake',
          author: 'Jane Smith'
        },
        {
          src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070',
          alt: '숲 사진',
          title: 'Forest Path',
          author: 'Mike Johnson'
        },
        {
          src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1974',
          alt: '폭포 사진',
          title: 'Waterfall',
          author: 'Sarah Wilson'
        },
        {
          src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070',
          alt: '강 사진',
          title: 'River Flow',
          author: 'David Brown'
        },
        {
          src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2175',
          alt: '초원 사진',
          title: 'Green Fields',
          author: 'Emily Davis'
        },
        {
          src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074',
          alt: '산맥 사진',
          title: 'Mountain Range',
          author: 'Chris Lee'
        },
        {
          src: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=1974',
          alt: '해변 사진',
          title: 'Ocean Waves',
          author: 'Lisa Garcia'
        }
      ]
    }
  },
  methods: {
    openImage(image, index) {
      this.$emit('openModal', image, this.images, index)
    }
  }
}
</script>

<style scoped>
.feed-page {
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
  border: 2px solid #f59e0b;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.photo-item {
  position: relative;
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
  transition: opacity 0.3s ease;
}

.photo-item:hover .photo {
  opacity: 0.7;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

.photo-item:hover .photo-overlay {
  opacity: 1;
}

.photo-info {
  color: white;
}

.photo-info h3 {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.photo-info p {
  font-size: 0.875rem;
  color: #d1d5db;
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
