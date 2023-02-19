import { defineStore } from "pinia";
import axios from "axios";

export const useChaptersStore = defineStore("chapters", {
  state() {
    return {
      chapters: [],
      currentChapter: null,
    };
  },
  actions: {
    /**
     * Fetch chapter with the id in the database.
     *
     * @param id The id of the chapter needs to be fetched.
     * @returns The chapter returned from the database.
     */
    async FETCH_CHAPTER(id) {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${baseUrl}/chapter/${id}`);

      return response.data;
    },

    /**
     * Empty the list of saved chapters. Add a new chapter and mark it as the current chapter.
     *
     * @param id Id of the chapter being marked as current.
     */
    async FETCH_CURRENT_CHAPTER(id) {
      this.chapters = [];
      this.chapters[0] = await this.FETCH_CHAPTER(id);
      this.currentChapter = this.chapters[0];
    },

    /**
     * Fetch the previous chapter of the first chapter in the saved list. Note that this async method can be called
     * multiple times & the result may not be what you expect. Because of that, this method must use as an internal
     * call of {@link ADD_PREVIOUS_CHAPTER} and not be called separately.
     *
     * @returns The previous chapter of the first chapter in the saved list.
     */
    async FETCH_PREVIOUS_CHAPTER() {
      if (!this.chapters[0] || !this.chapters[0].previousChapterId) {
        return;
      }

      // This value is only valid before the fetching start because fetching is an async function & another method
      // call may be finished first & alter the list.
      const previousChapterId = this.chapters[0].previousChapterId;
      return await this.FETCH_CHAPTER(previousChapterId);
    },

    /**
     * Synchronize and add the chapter to the beginning of the saved list.
     */
    async ADD_PREVIOUS_CHAPTER() {
      // Fetch the previous chapter from the database.
      const previousChapter = await this.FETCH_PREVIOUS_CHAPTER();

      if (!previousChapter) {
        return;
      }

      // Check the current state of the saved list, add a chapter to the beginning of the saved list if the state is
      // proper (the first chapter on the list has the previousChapterId equal to this chapter's id), and discard
      // otherwise.
      if (this.chapters[0].previousChapterId === previousChapter.id) {
        this.chapters.unshift(previousChapter);
      }
    },

    /**
     * Fetch the next chapter of the last chapter in the saved list. Note that this async method can be called
     * multiple times & the result may not be what you expect. Because of that, this method must use as an internal
     * call of {@link ADD_NEXT_CHAPTER} and not be called separately.
     *
     * @returns The next chapter of the last chapter in the saved list.
     */
    async FETCH_NEXT_CHAPTER() {
      const lastIndex = this.chapters.length - 1;
      if (!this.chapters[lastIndex] || !this.chapters[lastIndex].nextChapterId) {
        return;
      }

      // This value is only valid before the fetching start because fetching is an async function & another method
      // call may be finished first & alter the list.
      const nextChapterId = this.chapters[lastIndex].nextChapterId;
      return await this.FETCH_CHAPTER(nextChapterId);
    },

    /**
     * Synchronize and add the chapter to the end of the saved list.
     */
    async ADD_NEXT_CHAPTER() {
      const nextChapter = await this.FETCH_NEXT_CHAPTER();

      if (!nextChapter) {
        return;
      }

      // Check the current state of the saved list, add a chapter to the end of the saved list if the state is
      // proper (the last chapter on the list has the nextChapterId equal to this chapter's id), and discard
      // otherwise.
      const lastIndex = this.chapters.length - 1;
      if (this.chapters[lastIndex].nextChapterId === nextChapter.id) {
        this.chapters.push(nextChapter);
      }
    },

    /**
     * Set the current chapter based on the direction of the old one.
     *
     * @param direction The direction that the old chapter moves out of the viewport.
     */
    SET_CURRENT_CHAPTER(direction) {
      if (direction !== "up" && direction !== "down") {
        return;
      }

      let currentChapterIndex = this.chapters.indexOf(this.currentChapter);

      switch (direction) {
        // If the old chapter moves up, the new current chapter is the one that comes after it in the saved list.
        case "up":
          currentChapterIndex = Math.min(this.chapters.length - 1, currentChapterIndex + 1);
          break;
        // If the old chapter moves down, the new current chapter is the one that comes before it in the saved list.
        case "down":
          currentChapterIndex = Math.max(0, currentChapterIndex - 1);
          break;
      }

      console.log(currentChapterIndex);
      this.currentChapter = this.chapters[currentChapterIndex];
    },
  },
  getters: {
    CHAPTERS(state) {
      return state.chapters;
    },

    /**
     * If the first chapter in the saved list has the lastChapterId point to another id, then there is still has more
     * chapter. If not, then we've reached the beginning of the novel.
     * @param state This store's state
     * @returns {boolean} {@code true} if there is still has more chapter, {@code false} otherwise.
     */
    HAS_PREVIOUS_CHAPTER(state) {
      return state.chapters[0].previousChapterId != null;
    },

    /**
     * If the last chapter in the saved list has the nextChapterId point to another id, then there is still has more
     * chapter. If not, then we've reached the end of the novel.
     * @param state This store's state
     * @returns {boolean} {@code true} if there is still has more chapter, {@code false} otherwise.
     */
    HAS_NEXT_CHAPTER(state) {
      const lastIndex = state.chapters.length - 1;
      return state.chapters[lastIndex].nextChapterId != null;
    },

    CURRENT_CHAPTER(state) {
      return state.currentChapter;
    },
  },
});
