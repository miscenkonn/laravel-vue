import { createStore } from "vuex";

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
  mutations: {
    setTasks(state, data, totalCount) {
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
      let formattedLinks = [];

      for (let link of links) {
        if (link.url) {
          link.url = new URL(link.url);
          link.url = link.url.searchParams.get("page");
        }

        formattedLinks.push(link);
      }

      state.tasks.paging.links = formattedLinks;
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
