import { defineStore } from "pinia";
import axios from "axios";

export const useDetailsStore = defineStore("details", {
  state() {
    return {
      title: null,
    };
  },
  actions: {
    async FETCH_DETAIL(id) {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/title/${id}`);

      this.title = response.data;
    },
  },
  getters: {
    NOVEL_DETAILS(state) {
      return state.title;
    },
  },
});
