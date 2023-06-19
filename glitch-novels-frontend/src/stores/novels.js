import { defineStore } from "pinia";
import { getNovels } from "@/api/novel";

import paginateUtils from "@/stores/paginateUtils";

const pagination = paginateUtils("novels");

export const useNovelsStore = defineStore("novels", {
  state() {
    return {
      ...pagination.state,
      novels: [],
      currentPage: 1,
      novelsPerPage: Number.parseInt(import.meta.env.VITE_NOVELS_PER_PAGE),
    };
  },
  actions: {
    async FETCH_NOVELS() {
      const response = await getNovels();
      this.novels = response.data.novels;
    },

    ...pagination.actions,
  },
  getters: {
    ...pagination.getters,
  },
});
