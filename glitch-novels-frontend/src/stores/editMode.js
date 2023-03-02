import { defineStore } from "pinia";

export const useEditModeStore = defineStore("editMode", {
  state: () => {
    return {
      editMode: true,
      selectedData: [],
    };
  },
  actions: {
    TOGGLE_EDIT_MODE() {
      this.editMode = !this.editMode;
    },
    TOGGLE_SELECTED_DATA(value) {
      const index = this.selectedData.findIndex((data) => data.id === value.id);
      if (index === -1) {
        this.selectedData.push(value);
      } else {
        this.selectedData.splice(index, 1);
      }
    },
    CLEAR_SELECTED_DATA() {
      this.selectedData = [];
    },
  },
  getters: {
    IS_EDIT_MODE_ON(state) {
      return state.editMode;
    },
    HAS_VALUE(state) {
      return (value) => {
        const index = state.selectedData.findIndex((data) => data.id === value.id);
        return index !== -1;
      };
    },
  },
});
