import { defineStore } from "pinia";
import axios from "axios";

import paginateUtils from "@/stores/paginateUtils";

const pagination = paginateUtils("chapters");

export const useDetailsStore = defineStore("details", {
  state() {
    return {
      ...pagination.state,
      novelInfo: null,
      chapters: [],
      currentPage: 1,
      chaptersPerPage: Number.parseInt(import.meta.env.VITE_CHAPTERS_PER_PAGE),
    };
  },
  actions: {
    async FETCH_DETAIL(id) {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/novel/${id}`);

      const { chapters, ...novelInfo } = response.data;
      this.novelInfo = novelInfo;
      this.novelInfo.numberOfChapters = chapters.length;
      this.chapters = chapters;
    },

    ...pagination.actions,
  },
  getters: {
    NOVEL_DETAILS(state) {
      return state.novelInfo;
    },

    ...pagination.getters,
  },
});
