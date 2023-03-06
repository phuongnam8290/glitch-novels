import { defineStore } from "pinia";

export const useNavigationStore = defineStore("navigation", {
  state() {
    return {
      isSidebarOpen: false,
      /** @type {Map<string, Element>} */
      navigationElements: new Map(),
    };
  },
  actions: {
    TOGGLE_SIDEBAR() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    CLOSE_SIDEBAR() {
      this.isSidebarOpen = false;
    },

    /**
     * Add a navigation element for tracking purposes.
     * @param {string} name - The name of this navigation element.
     * @param {Element} element - The navigation element need tracking.
     */
    ADD_NAVIGATION_ELEMENT(name, element) {
      this.navigationElements.set(name, element);
    },

    /**
     * Remove a navigation element from the Map.
     * @param {string} name - The name of the removed navigation element.
     */
    REMOVE_NAVIGATION_ELEMENT(name) {
      this.navigationElements.delete(name);
    },
  },
  getters: {
    IS_SIDEBAR_OPEN(state) {
      return state.isSidebarOpen;
    },
    NAVIGATION_ELEMENTS(state) {
      return state.navigationElements;
    },
  },
});
