import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAdvancedSearchStore = defineStore("advancedSearch", () => {
  const searchResults = ref([]);
  const searchCriteria = ref({});

  // We are using the deep watch to trigger the callback when the value of searchCriteria is changed.
  watch(
    searchCriteria,
    (newSearchCriteria) => {
      console.log("Search criteria changed");
      console.log(searchCriteria);
      //TODO: fetch data from backend & populate searchResults
    },
    { deep: true }
  );

  return {
    searchCriteria,
    searchResults,
  };
});
