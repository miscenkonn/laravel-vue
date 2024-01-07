<script setup>
  import store from '../storage'
  import router from '../router'
  import moment from 'moment';
  import { onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import {apiUrl} from '../main';

  const filters = [
    { label: 'All', value: null },
    { label: 'In progress', value: false },
    { label: 'Completed', value: true },
  ]

  const fetchTasks = async () => {
    store.commit('setTasks', [])
    store.commit('setIsLoading', true);

    try {
      const page = store.state.tasks.paging.page;
      const completed = store.state.tasks.paging.filters.completed;
      const response = await fetch(`${apiUrl}tasks?page=${page}${completed !== null ? '&completed=' + completed : ''}`);

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const { data, links } = await response.json();
      store.commit('setTasks', data);
      store.commit('setLinks', links);
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

  const deleteTask = async (id) => {
    store.commit('setIsLoading', true);

    try {
      const response = await fetch(`${apiUrl}tasks/${id}`, {method: 'DELETE'});

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      await fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      store.commit('setIsLoading', false);
    }
  };

  onMounted(() => {
    // Page and filter params
    let url = new URL(window.location.href);
    let page = url.searchParams.get("page");
    let completed = url.searchParams.get("completed");

    setPage(page ? page : 1)

    store.commit('setPage', page ? page : 1);
    if (completed !== null) {
      store.commit('setFilter', completed);
    }
  });

  const setParams = () => {
    const page = store.state.tasks.paging.page;
    const completed = store.state.tasks.paging.filters.completed;

    router.push(`/?page=${page}${completed !== null ? '&completed=' + completed : ''}`);
    fetchTasks()
  }

  const setPage = (page) => {
    if (page !== store.state.tasks.paging.page) {
      store.commit('setPage', page);
      setParams();
    }
  }

  const setFilter = (completed) => {
    if (completed !== store.state.tasks.paging.filters.completed) {
      store.commit('setPage', '1')
      store.commit('setFilter', completed);
      setParams();
    }
  }
</script>

<template>
  <div style="margin: 0 auto; border-radius: 15px; background-color: rgba(255, 255, 255, 35%);" class="p-5">
    <div class="row d-flex align-items-center justify-content-between">

      <div class="col-4 d-flex justify-content-start">
        <div class="col">
          <h3> My Day</h3> 
          <h5>{{moment().format('dddd, D MMMM')}}</h5>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-end"><a href="#" class="btn btn-primary text-uppercase px-4 py-2"><b>Add new</b></a></div>
    </div>
    <div class="row mt-5">

      <!-- Loading State -->

      <div v-if="store.state.tasks.isLoading" class="text-center" style="margin-top: 250px;">
        <div class="spinner-border" role="status"></div>
      </div>

      <!-- Empty State -->

      <div v-if="store.state.tasks.data.length === 0 && !store.state.tasks.isLoading">
        <div class="d-flex align-items-center justify-content-center py-5" style="border-radius: 15px; width:250px; height: 250px; margin: 100px auto;  background-color: rgb(255 255 255 / 75%); backdrop-filter: blur(15px);" role="alert">
          <div class="text-center">
          <h1 class="pb-3">🎯</h1>
          <h6 class="pb-3">Task list is empty</h6>
          <small>Add some new tasks using the 'Add' button in the top right corner.</small>
        </div>
        </div>
      </div>

      <!-- Filters -->

      <ul v-if="store.state.tasks.data.length !== 0 && !store.state.tasks.isLoading" class="nav nav-pills d-flex justify-content-end mb-3">
        <li v-for="filter in filters" class="nav-item">
          <a class="nav-link" :class="[filter.value === store.state.tasks.paging.filters.completed ? 'active' : '']" aria-current="page" @click="setFilter(filter.value)">{{ filter.label }}</a>
        </li>
      </ul>

      <!-- Task Items -->

      <div class="col-12 px-5 task" :class="[task.completed ? 'task--completed' : '']" v-for="task in store.state.tasks.data">
        <div class="row align-items-center py-3">
          <div class="col-1 d-flex align-items-center justify-content-start">
            <input type="checkbox" v-model="task.completed"/>
          </div>
          <div class="col-10" :class="task.completed ? 'text-decoration-line-through' : ''">
            <p><b>{{ task.title }}</b> {{ task.description }}</p>
          </div>
          <div class="col-1 d-flex align-items-center justify-content-end">
            <a href="#" @click="deleteTask(task.id)" class="">❌</a>
          </div>
        </div>
      </div>


      <!-- Paging -->

      <nav v-if="!store.state.tasks.isLoading && store.state.tasks.data.length !== 0" aria-label="Navigation" class="mt-3">
        <ul class="pagination justify-content-end">
          <li v-for="page in store.state.tasks.paging.links" class="page-item" :class="[page.url ? '' : 'disabled', page.url == store.state.tasks.paging.page ? 'active' : '']">
            <a class="page-link" tabindex="-1" v-html="page.label" @click="setPage(page.url)"></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
  input[type="checkbox"] {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  p {
    margin: 0
  }

  .task {
    transition: all 0.25s;
    border-bottom: 1px solid rgba(216, 216, 216, 0.35); 

    &:hover {
      opacity: 0.6;
    }

    &:first-of-type {
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
    }

    &:last-of-type {
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
    }
  }
  
  .task--completed {
    background-color: #b2ddb58c;
  }
</style>