import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useEditModeStore = defineStore("editMode", () => {
  const editMode = ref(false);
  /** @type {Map<string, Object>} */
  const selectedData = ref(new Map());

  const IS_EDIT_MODE_ON = computed(() => editMode.value);
  const HAS_VALUE = computed(() => {
    return (value) => selectedData.value.has(value.id);
  });
  const ARRAY_SELECTED_DATA = computed(() => [...selectedData.value.values()]);

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

  const TURN_OFF_EDIT_MODE = () => {
    editMode.value = false;
  };

  const route = useRoute();
  watch(route, () => CLEAR_SELECTED_DATA());

  return {
    editMode,
    selectedData,
    IS_EDIT_MODE_ON,
    HAS_VALUE,
    ARRAY_SELECTED_DATA,
    TOGGLE_SELECTED_DATA,
    CLEAR_SELECTED_DATA,
    TURN_OFF_EDIT_MODE,
  };
});
