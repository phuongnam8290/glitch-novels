import { defineStore } from "pinia";
import axios from "axios";

import paginateUtils from "@/stores/paginateUtils";

const pagination = paginateUtils("titles");

export const useTitlesStore = defineStore("titles", {
  state() {
    return {
      ...pagination.state,
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

    ...pagination.actions,
  },
  getters: {
    ...pagination.getters,
  },
});
