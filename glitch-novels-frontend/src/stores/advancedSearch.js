import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { searchWithMultipleCriteria } from "@/api/search";
import { usePagination } from "@/composable/utils/pagination";

export const useAdvancedSearchStore = defineStore("advancedSearch", () => {
  const SEARCH_CRITERIA = ref({
    title: "",
    author: "",
    publicationStatuses: [],
    genres: [],
    tags: [],
  });

  // We are using the deep watch to trigger the callback when the value of searchCriteria is changed.
  watch(
    SEARCH_CRITERIA,
    async (newSearchCriteria) => {
      // Call backend when search criteria changed.
      const response = await searchWithMultipleCriteria(newSearchCriteria);
      SEARCH_RESULTS.value = response.data.results;
    },
    { deep: true }
  );

  const SEARCH_RESULTS = ref([]);
  const pagination = usePagination(SEARCH_RESULTS, {
    dataName: "results",
    itemsPerPage: Number.parseInt(import.meta.env.VITE_NOVELS_PER_PAGE),
  });

  // Change to the fist page if search results change.
  // TODO: Handle empty search result
  watch(SEARCH_RESULTS, () => {
    pagination.CHANGE_PAGE(1);
  });

  return {
    SEARCH_CRITERIA,
    SEARCH_RESULTS,
    ...pagination,
  };
});
