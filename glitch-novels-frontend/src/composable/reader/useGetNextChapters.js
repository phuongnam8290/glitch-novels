import { computed, onMounted, onUnmounted, watch } from "vue";
import { useChaptersStore } from "@/stores/chapter";

export const useGetNextChapter = (chapterListRef, nextIndicatorRef) => {
  // When using pinia store outside component, we must put its creation inside a function to defer calls after pinia has
  // been installed.
  const chaptersStore = useChaptersStore();

  // Determine if should fetch new chapters or not
  const HAS_NEXT_CHAPTER = computed(() => chaptersStore.HAS_NEXT_CHAPTER);

  const shouldLoadMoreNextChapter = () => {
    // If the distance between the current position and the end of the page is smaller than the nextIndicator height +
    // padding height, then add new chapters. If not, then stop. Doing this will make the nextIndicator element pushed
    // down far enough so that the next time user scrolls down near the end of the page, the intersection observer
    // callback will be called again.
    const wrapperHeightFromViewportToBottom = chapterListRef.value.getBoundingClientRect().bottom;
    const nextIndicatorHeight = nextIndicatorRef.value.scrollHeight;
    const paddingHeight = 200;

    return (
      wrapperHeightFromViewportToBottom < window.innerHeight + nextIndicatorHeight + paddingHeight &&
      HAS_NEXT_CHAPTER.value
    );
  };

  // Handle auto-load next chapters when near the end of the pages.
  const loadNextChapters = async () => {
    while (shouldLoadMoreNextChapter()) {
      await chaptersStore.ADD_NEXT_CHAPTER();
    }
  };

  watch(HAS_NEXT_CHAPTER, async (value) => {
    if (value) {
      await loadNextChapters();
    }
  });

  let nextIntersectionObserver = null;

  onMounted(() => {
    // Observe the nextIndicator element, and load the next chapters if users reach it.
    nextIntersectionObserver = new IntersectionObserver(loadNextChapters);
    nextIntersectionObserver.observe(nextIndicatorRef.value);
  });

  onUnmounted(() => {
    nextIntersectionObserver.disconnect();
  });
};
