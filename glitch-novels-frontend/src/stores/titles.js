import { defineStore } from "pinia";
import axios from "axios";

export const useTitlesStore = defineStore("titles", {
  state() {
    return {
      total: 0,
      titles: [],
    };
  },
  actions: {
    async FETCH_TITLES() {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/titles`);

      this.total = response.data.total;
      this.titles = response.data.titles;
    },
  },
  getters: {
    ALL_TITLES(state) {
      return state.titles;
    },
    TOTAL_TITLES(state) {
      return state.total;
    },
  },
});
