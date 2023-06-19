import { defineStore } from "pinia";
import { getNovel } from "@/api/novel";

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
      const response = await getNovel(id);

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
