<template>
  <div class="gallery-page">
    <!-- Header -->
    <AppHeader
      currentPage="gallery"
      @navigate="handleNavigate"
      @search="handleSearch"
    />

    <main class="main-content">
      <div class="gallery-intro">
        <h2 class="gallery-title">Picstory GALLERY</h2>
        <p class="gallery-subtitle">이달의 명예로운 작품들을 만나보세요.</p>
      </div>

      <!-- Gallery Items -->
      <div
        v-for="(item, index) in galleryItems"
        :key="index"
        class="gallery-item"
      >
        <div class="gallery-image">
          <img :src="item.image" :alt="item.title" class="gallery-photo" />
        </div>
        <div class="gallery-content">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-author">by {{ item.author }}</p>
          <p class="item-description">{{ item.description }}</p>
          <div class="item-stats">
            <div class="stat">
              <svg
                class="stat-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path
                  fill-rule="evenodd"
                  d="M.664 10.59a1.651 1.651 0 010-1.18l.879-1.528A1.65 1.65 0 013.437 7h13.126c1.062 0 1.92.714 2.248 1.754l.879 1.528a1.651 1.651 0 010 1.18l-.879 1.528A1.65 1.65 0 0116.563 13H3.437a1.65 1.65 0 01-1.894-1.144L.664 10.59zM10 15a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ item.views }} Views</span>
            </div>
            <span class="stat-separator">·</span>
            <div class="stat">
              <svg
                class="stat-icon like-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ item.likes }} Likes</span>
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
    name: 'GalleryPage',
    components: {
      AppHeader
    },
    data() {
      return {
        galleryItems: [
          {
            image:
              'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1974',
            title: 'Echoes of Silence',
            author: 'Jane Smith',
            description:
              '고요한 사막의 새벽, 빛과 그림자가 만들어내는 장엄한 순간을 포착했습니다. 자연의 위대함 앞에서 인간은 한없이 작아집니다.',
            views: '15,742',
            likes: '3,128'
          },
          {
            image:
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
            title: 'Urban Dreams',
            author: 'Mike Johnson',
            description:
              '도시의 밤, 네온사인이 만들어내는 환상적인 빛의 향연. 현대 문명의 아름다움과 고독함을 동시에 담았습니다.',
            views: '12,456',
            likes: '2,891'
          },
          {
            image:
              'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070',
            title: "Ocean's Whisper",
            author: 'Sarah Wilson',
            description:
              '파도가 모래사장에 부서지는 순간의 평온함. 바다가 들려주는 영원한 이야기를 사진 한 장에 담았습니다.',
            views: '18,923',
            likes: '4,567'
          }
        ]
      }
    },
    methods: {
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
  .gallery-page {
    min-height: 100vh;
    background-color: #111827;
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem 2rem;
  }

  .gallery-intro {
    text-align: center;
    margin-bottom: 3rem;
  }

  .gallery-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #f59e0b;
    margin-bottom: 0.5rem;
    font-family: 'Times New Roman', serif;
  }

  .gallery-subtitle {
    color: #9ca3af;
  }

  .gallery-item {
    background-color: #1f2937;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
  }

  .gallery-image {
    flex: 1;
  }

  .gallery-photo {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .gallery-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .item-title {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .item-author {
    color: #f59e0b;
    margin-bottom: 1rem;
  }

  .item-description {
    color: #d1d5db;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .item-stats {
    display: flex;
    align-items: center;
    color: #9ca3af;
    font-size: 0.875rem;
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

  .like-icon {
    color: #ef4444;
  }

  .stat-separator {
    margin: 0 0.5rem;
  }

  @media (min-width: 768px) {
    .gallery-item {
      flex-direction: row;
    }

    .gallery-image {
      width: 50%;
    }

    .gallery-content {
      width: 50%;
    }

    .gallery-photo {
      height: 100%;
    }
  }

  @media (max-width: 768px) {
    .gallery-title {
      font-size: 2rem;
    }

    .gallery-content {
      padding: 1.5rem;
    }

    .item-title {
      font-size: 1.5rem;
    }
  }
</style>
