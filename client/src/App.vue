<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import TaskList from './components/TaskList.vue'

</script>

<template>
  <RouterView />
</template>

<style scoped>
  #app {
    min-height: 100vh;
  }
</style>
