import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      tasks: {
        data: [],
        page: 1,
        limit: 10,
        totalCount: 0,
        isLoading: false,
      },
    };
  },
  mutations: {
    setTasks(state, data, totalCount) {
      state.tasks.data = data;
      state.tasks.totalCount = totalCount;
    },
    setPage(state, page) {
      state.tasks.page = page;
    },
    setTaskCompleted(state, id, completed) {
      const task = state.tasks.data.find((t) => t.id === id);

      if (task) {
        task.completed = completed;
      }
    },
    setIsLoading(state, isLoading) {
      state.tasks.isLoading = isLoading;
    },
  },
});

export default store;
