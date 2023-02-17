import { defineStore } from "pinia";
import axios from "axios";

export const useChaptersStore = defineStore("chapters", {
  state() {
    return {
      chapters: [],
    };
  },
  actions: {
    async FETCH_CHAPTER(id) {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/chapter/${id}`);

      return response.data;
    },
    async FETCH_CURRENT_CHAPTER(id) {
      this.chapters = [];
      this.chapters[0] = await this.FETCH_CHAPTER(id);
    },
    async FETCH_NEXT_CHAPTER() {
      const lastIndex = this.chapters.length - 1;
      if (!this.chapters[lastIndex] || !this.chapters[lastIndex].nextChapterId) {
        return;
      }

      const nextChapterId = this.chapters[lastIndex].nextChapterId;
      this.chapters.push(await this.FETCH_CHAPTER(nextChapterId));
    },
    async FETCH_PREV_CHAPTER() {
      if (!this.chapters[0] || !this.chapters[0].previousChapterId) {
        return;
      }

      const previousChapterId = this.chapters[0].previousChapterId;
      const previousChapter = await this.FETCH_CHAPTER(previousChapterId);
      this.chapters.unshift(previousChapter);
    },
  },
  getters: {
    CHAPTERS(state) {
      return state.chapters;
    },
    HAS_NEXT_CHAPTER(state) {
      return state.chapters[state.chapters.length - 1].nextChapterId != null;
    },
    HAS_PREVIOUS_CHAPTER(state) {
      return state.chapters[0].previousChapterId != null;
    },
  },
});
