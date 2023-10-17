import { ref } from "vue";
import { defineStore } from "pinia";
import { getNovel } from "@/api/novel";
import { usePagination } from "@/composable/utils/pagination";

export const useDetailsStore = defineStore("details", () => {
  const NOVEL_DETAILS = ref(null);
  const CHAPTERS = ref([]);

  const pagination = usePagination(CHAPTERS, {
    dataName: "chapters",
    itemsPerPage: Number.parseInt(import.meta.env.VITE_CHAPTERS_PER_PAGE),
  });

  const FETCH_DETAIL = async (id) => {
    const response = await getNovel(id);

    const { chapters, ...novelInfo } = response.data;
    NOVEL_DETAILS.value = novelInfo;
    NOVEL_DETAILS.value.numberOfChapters = chapters.length;
    CHAPTERS.value = chapters;
  };

  return {
    NOVEL_DETAILS,
    CHAPTERS,
    FETCH_DETAIL,
    ...pagination,
  };
});
