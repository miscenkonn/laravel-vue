<script setup>
  import TaskList from '../components/TaskList.vue'
  import { ref, onMounted } from 'vue';
  import store from '../storage'


  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchTasks = async () => {
    store.commit('setIsLoading', true);

    try {
      const response = await fetch(`${apiUrl}tasks?page=${store.state.tasks.page}&limit=${store.state.tasks.limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const { data } = await response.json();
      store.commit('setTasks', data)
    } catch (error) {
      console.error(error);
    } finally {
      store.commit('setIsLoading', false);
    }
  };

  // const setCompleted = (taskId) => {
  //   const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
  //   if (taskIndex !== -1) {
  //     tasks.value[taskIndex].completed = true;
  //   }
  // };

  // const deleteTask = (taskId) => {
  //   tasks.value = tasks.value.filter((task) => task.id !== taskId);
  // };

  onMounted(() => {
    fetchTasks();
  });

</script>

<template>
  <main class="container">
    <TaskList />
  </main>
</template>
