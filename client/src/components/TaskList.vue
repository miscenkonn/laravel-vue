<script setup>
  import store from '../storage'
  import moment from 'moment';
</script>

<template>
  <div style="margin: 0 auto; border-radius: 15px;" class="p-5">
    <div class="row d-flex align-items-center justify-content-between">

      <div class="col-4 d-flex justify-content-start">
        <div class="col">
          <h3> My Day</h3> 
          <h5>{{moment().format('dddd, D MMMM')}}</h5>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-end"><a href="#" class="btn btn-secondary text-uppercase px-4 py-2"><b>Add new</b></a></div>
    </div>
    <div class="row mt-5">
      <div v-if="store.state.tasks.isLoading" class="text-center" style="margin-top: 250px;">
        <div class="spinner-border" role="status"></div>
      </div>

      <div v-if="store.state.tasks.data.length === 0 && !store.state.tasks.isLoading">
        <div class="d-flex align-items-center justify-content-center py-5" style="border-radius: 15px; width:250px; height: 250px; margin: 100px auto;  background-color: rgb(33 33 33 / 75%); backdrop-filter: blur(15px);" role="alert">
          <div class="text-center">
          <h1 class="pb-3">🎯</h1>
          <h6 class="pb-3">Task list is empty</h6>
          <small>Add some new tasks using the 'Add' button in the top right corner.</small>
        </div>
        </div>
      </div>

      <div style="border-bottom: 1px solid rgba(216, 216, 216, 0.35); background-color: rgb(255 255 255 / 55%); backdrop-filter: blur(15px);" class="col-12 px-5 task" v-for="task in store.state.tasks.data">
        <div class="row align-items-center py-3">
          <div class="col-1 d-flex align-items-center justify-content-start">
            <input type="checkbox" v-model="task.completed"/>
          </div>
          <div class="col-10" :class="task.completed ? 'text-decoration-line-through' : ''">
            <p><b>{{ task.title }}</b> {{ task.description }}</p>
          </div>
          <div class="col-1 d-flex align-items-center justify-content-end">
            <a href="#" class="">❌</a>
          </div>
        </div>
      </div>

      <nav v-if="!store.state.tasks.isLoading && store.state.tasks.data.length !== 0" aria-label="Navigation" class="mt-2">
        <ul class="pagination justify-content-end">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
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

    &:hover {
      opacity: 0.75;
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
</style>