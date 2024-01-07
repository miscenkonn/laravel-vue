<script setup>
  import CreateForm from '../components/CreateForm.vue'
</script>

<template>
  <main class="container">
    <CreateForm />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
