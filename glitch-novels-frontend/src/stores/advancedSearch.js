import { computed, ref, watch } from "vue";
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

  // We are using the deep watch to trigger the callback when the value of searchCriteria is changed. Set immediate
  // to true to fetch all novels from the db when the store first loaded.
  watch(
    SEARCH_CRITERIA,
    async (newSearchCriteria) => {
      // Call backend when search criteria changed.
      const response = await searchWithMultipleCriteria(newSearchCriteria);
      SEARCH_RESULTS.value = response.data.results;
    },
    { deep: true, immediate: true }
  );

  const SEARCH_RESULTS = ref([]);
  const pagination = usePagination(SEARCH_RESULTS, {
    dataName: "results",
    itemsPerPage: Number.parseInt(import.meta.env.VITE_NOVELS_PER_PAGE),
  });

  // Change to the fist page if search results change.
  watch(SEARCH_RESULTS, () => {
    pagination.CHANGE_PAGE(1);
  });

  const IS_SEARCH_RESULTS_EMPTY = computed(() => SEARCH_RESULTS.value.length === 0);

  return {
    SEARCH_CRITERIA,
    SEARCH_RESULTS,

    IS_SEARCH_RESULTS_EMPTY,

    ...pagination,
  };
});
