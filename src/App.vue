<template>
  <div id="app">
    <PicstoryApp />
  </div>
</template>

<script>
import PicstoryApp from './components/PicstoryApp.vue'

export default {
  name: 'App',
  components: {
    PicstoryApp
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #111827;
  color: white;
}

#app {
  min-height: 100vh;
}
</style>
