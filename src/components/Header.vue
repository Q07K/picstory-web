<template>
  <header class="header">
    <div class="header-container">
      <button @click="$emit('navigate', 'feed')" class="logo">
        <img src="@/assets/logo.png" alt="Picstory" class="logo-img" />
      </button>
      <div v-if="currentPage === 'feed'" class="search-container">
        <input
          type="search"
          placeholder="검색..."
          v-model="searchQuery"
          class="search-input"
          @input="$emit('search', searchQuery)"
        />
        <svg
          class="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          ></path>
        </svg>
      </div>
      <div class="nav-buttons">
        <button
          @click="$emit('navigate', 'gallery')"
          class="nav-btn"
          :class="{ active: currentPage === 'gallery' }"
        >
          Gallery
        </button>
        <button @click="$emit('navigate', 'profile')" class="profile-btn">
          <img
            src="https://placehold.co/40x40/334155/FFFFFF?text=Me"
            class="profile-img"
            alt="Profile"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
    props: {
      currentPage: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        searchQuery: ''
      }
    }
  }
</script>

<style scoped>
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
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .logo-img {
    height: 2.5rem;
    width: auto;
    transition: opacity 0.3s ease;
  }

  .logo:hover .logo-img {
    opacity: 0.8;
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
    gap: 1.5rem;
  }

  .nav-btn {
    color: #d1d5db;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .nav-btn:hover,
  .nav-btn.active {
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
  }
</style>
