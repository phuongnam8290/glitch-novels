import { defineStore } from "pinia";
import axios from "axios";

export const useDetailsStore = defineStore("details", {
  state() {
    return {
      title: null,
      currentPage: 1,
      chaptersPerPage: Number.parseInt(import.meta.env.VITE_CHAPTERS_PER_PAGE),
    };
  },
  actions: {
    async FETCH_DETAIL(id) {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/title/${id}`);

      this.title = response.data;
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
    NOVEL_DETAILS(state) {
      return state.title;
    },
    CURRENT_CHAPTERS(state) {
      const startChapterIndex = (state.currentPage - 1) * state.chaptersPerPage;
      const endChapterIndex = startChapterIndex + state.chaptersPerPage;

      return state.title.chapters.slice(startChapterIndex, endChapterIndex);
    },
    TOTAL_PAGES(state) {
      return Math.ceil(state.title.chapters.length / state.chaptersPerPage);
    },
    CURRENT_PAGE(state) {
      return state.currentPage;
    },
  },
});
