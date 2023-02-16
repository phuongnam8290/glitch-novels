import { defineStore } from "pinia";
import axios from "axios";

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
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/novels`);

      this.novels = response.data.novels;
    },

    ...pagination.actions,
  },
  getters: {
    ...pagination.getters,
  },
});
