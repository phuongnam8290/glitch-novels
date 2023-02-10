import { defineStore } from "pinia";
import axios from "axios";

export const useTitlesStore = defineStore("titles", {
  state() {
    return {
      total: 0,
      titles: [],
      currentPage: 1,
      titlesPerPage: Number.parseInt(import.meta.env.VITE_TITLES_PER_PAGE),
    };
  },
  actions: {
    async FETCH_TITLES() {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/titles`);

      this.total = response.data.total;
      this.titles = response.data.titles;
    },
    CHANGE_PAGE(page) {
      // Convert page parameter to Integer, prevent String concatenation.
      page = Number.parseInt(page);

      // If cannot convert page parameter, do nothing.
      if (!Number.isInteger(page)) {
        return;
      }

      // Page parameter must be between the boundary of 1 and max page. If not, assign to its the nearest valid value.
      if (page > this.TOTAL_PAGES) {
        page = this.TOTAL_PAGES;
      }
      if (page < 1) {
        page = 1;
      }

      this.currentPage = page;
    },
  },
  getters: {
    CURRENT_TITLES(state) {
      const startTitleIndex = (state.currentPage - 1) * state.titlesPerPage;
      const endTitleIndex = startTitleIndex + state.titlesPerPage;

      return state.titles.slice(startTitleIndex, endTitleIndex);
    },
    TOTAL_PAGES(state) {
      return Math.ceil(state.total / state.titlesPerPage);
    },
    CURRENT_PAGE(state) {
      return state.currentPage;
    },
  },
});
