<script setup>
  import store from '../storage'
  import { ref } from 'vue';
  import { apiUrl, toastPosition } from '../common/constants';
  import { useToast } from 'vue-toast-notification';

  const toast = useToast();
  const title = ref('');
  const description = ref('');

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.value.trim()) {
      toast.open({message: 'Provide title for your task', type: 'warning', position: toastPosition});
      return;
    }

    store.commit('setIsLoading', true);

    try {
      const response = await fetch(`${apiUrl}tasks`, 
        {
          method: 'POST', body: JSON.stringify({"title": title.value, "description": description.value}), 
          headers: {
          'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      title.value = '';
      description.value = '';

      toast.open({message: 'Task created', type: 'warning', position: toastPosition});
    } catch (error) {
      console.error(error);
      toast.open({message: error, type: 'error', position: toastPosition});
    } finally {
      store.commit('setIsLoading', false);
    }
  };
</script>

<template>
  <div style="margin: 0 auto; border-radius: 15px; background-color: rgba(255, 255, 255, 35%);" class="p-5">
    <div class="row d-flex align-items-center justify-content-between">
      <div class="col-4 d-flex justify-content-start">
        <div class="col">
          <h3>Add New Task</h3> 
          <h5>What are your plans today?</h5>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <router-link to="/">
          <a class="btn btn-secondary text-uppercase px-4 py-2">
            <b>Go back</b>
          </a>
        </router-link>
      </div>
    </div>
    <form class="pt-5">
      <div class="form-group mb-2">
        <label for="title">Title</label>
        <input type="text" v-model="title" required class="form-control" id="title" maxlength="255" placeholder="Type your task name...">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="description" class="form-control" id="description" maxlength="255" rows="3" placeholder="Provide some notes..."></textarea>
      </div>
      <div class="d-flex justify-content-center">
        <button @click="createTask" class="btn btn-md font-weight-bold btn-primary text-uppercase mt-3" style="width: 200px; height: 42px"><b>Save</b></button>
      </div>
    </form>
  </div>
</template>
