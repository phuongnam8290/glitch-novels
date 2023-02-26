import { defineStore } from "pinia";

export const useEditModeStore = defineStore("editMode", {
  state: () => {
    return {
      editMode: true,
    };
  },
  getters: {
    IS_EDIT_MODE_ON(state) {
      return state.editMode;
    },
  },
});
