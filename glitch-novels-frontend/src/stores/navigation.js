import { defineStore } from "pinia";

export const useNavigationStore = defineStore("navigation", {
  state() {
    return {
      isSidebarOpen: false,
    };
  },
  actions: {
    TOGGLE_SIDEBAR() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    CLOSE_SIDEBAR() {
      this.isSidebarOpen = false;
    },
  },
  getters: {
    IS_SIDEBAR_OPEN(state) {
      return state.isSidebarOpen;
    },
  },
});
