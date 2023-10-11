import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { searchWithMultipleCriteria } from "@/api/search";

export const useAdvancedSearchStore = defineStore("advancedSearch", () => {
  const searchResults = ref([]);
  const searchCriteria = ref({
    title: "",
    author: "",
    publicationStatuses: [],
    genres: [],
    tags: [],
  });

  // We are using the deep watch to trigger the callback when the value of searchCriteria is changed.
  watch(
    searchCriteria,
    async (newSearchCriteria) => {
      // Call backend when search criteria changed.
      const response = await searchWithMultipleCriteria(newSearchCriteria);
      console.log(response.data);
    },
    { deep: true }
  );

  return {
    searchCriteria,
    searchResults,
  };
});
