import { ref } from "vue";
import { defineStore } from "pinia";
import { getNovels } from "@/api/novel";
import { usePagination } from "@/composable/utils/pagination";

export const useNovelsStore = defineStore("novels", () => {
  const NOVELS = ref([]);
  const pagination = usePagination(NOVELS, {
    dataName: "novels",
    itemsPerPage: Number.parseInt(import.meta.env.VITE_NOVELS_PER_PAGE),
  });

  const FETCH_NOVELS = async () => {
    const response = await getNovels();
    NOVELS.value = response.data.novels;
  };

  return {
    NOVELS,
    FETCH_NOVELS,
    ...pagination,
  };
});
