<template>
  <div class="feed-page">
    <!-- Header -->
    <AppHeader
      currentPage="feed"
      @navigate="handleNavigate"
      @search="handleSearch"
    />

    <!-- Photo Grid -->
    <main class="main-content">
      <div class="photo-grid">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="photo-item"
          @click="openImage(image, index)"
        >
          <img :src="image.src" :alt="image.alt" class="photo" />
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
  import AppHeader from './Header.vue'

  export default {
    name: 'FeedPage',
    components: {
      AppHeader
    },
    data() {
      return {
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
  .feed-page {
    min-height: 100vh;
    background-color: #111827;
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
    .photo-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    .photo {
      height: 200px;
    }
  }
</style>
