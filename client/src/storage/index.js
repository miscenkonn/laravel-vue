import { createStore } from "vuex";
import { toRaw } from "vue";
const store = createStore({
  state() {
    return {
      tasks: {
        data: [],
        paging: {
          page: 1,
          filters: {
            completed: null,
          },
          links: [],
        },
        totalCount: 0,
        isLoading: false,
      },
    };
  },
  getters: {
    getTaskById: (state) => (id) => {
      return toRaw(state.tasks.data.find((task) => task.id === id));
    },
  },
  mutations: {
    setTasks(state, data, totalCount) {
      for (let task of data) {
        task.completed = task.completed === 1;
      }

      state.tasks.data = data;
      state.tasks.totalCount = totalCount;
    },
    setPage(state, page) {
      state.tasks.paging.page = page;
    },
    setFilter(state, completed) {
      state.tasks.paging.filters.completed = completed;
    },
    setLinks(state, links) {
      for (let link of links) {
        if (link.url) {
          link.url = new URL(link.url);
          link.url = link.url.searchParams.get("page");
        }
      }

      state.tasks.paging.links = links;
    },
    setTaskCompleted(state, { id, completed }) {
      const task = toRaw(state.tasks.data.find((t) => t.id === id));

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
