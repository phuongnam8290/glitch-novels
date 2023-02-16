import { defineStore } from "pinia";
import axios from "axios";

import paginateUtils from "@/stores/paginateUtils";

const pagination = paginateUtils("chapters");

export const useDetailsStore = defineStore("details", {
  state() {
    return {
      ...pagination.state,
      titleInfo: null,
      chapters: [],
      currentPage: 1,
      chaptersPerPage: Number.parseInt(import.meta.env.VITE_CHAPTERS_PER_PAGE),
    };
  },
  actions: {
    async FETCH_DETAIL(id) {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/title/${id}`);

      const { chapters, ...titleInfo } = response.data;
      this.titleInfo = titleInfo;
      this.titleInfo.numberOfChapters = chapters.length;
      this.chapters = chapters;
    },

    ...pagination.actions,
  },
  getters: {
    NOVEL_DETAILS(state) {
      return state.titleInfo;
    },

    ...pagination.getters,
  },
});
