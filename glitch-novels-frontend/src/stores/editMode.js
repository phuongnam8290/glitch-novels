import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useEditModeStore = defineStore("editMode", () => {
  const editMode = ref(true);
  const selectedData = ref(new Map());

  const IS_EDIT_MODE_ON = computed(() => editMode.value);
  const HAS_VALUE = computed(() => {
    return (value) => selectedData.value.has(value.id);
  });

  watch(editMode, (isEditModeOn) => {
    if (!isEditModeOn) {
      CLEAR_SELECTED_DATA();
    }
  });

  const TOGGLE_SELECTED_DATA = (value) => {
    if (selectedData.value.has(value.id)) {
      selectedData.value.delete(value.id);
    } else {
      selectedData.value.set(value.id, value);
    }
  };

  const CLEAR_SELECTED_DATA = () => {
    selectedData.value.clear();
  };

  return { editMode, selectedData, IS_EDIT_MODE_ON, HAS_VALUE, TOGGLE_SELECTED_DATA, CLEAR_SELECTED_DATA };
});
