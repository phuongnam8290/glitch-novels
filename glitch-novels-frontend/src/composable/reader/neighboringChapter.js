import { computed, nextTick, onMounted, onUnmounted } from "vue";

import { useChaptersStore } from "@/stores/chapter";
import { useScrollElement } from "@/composable/animations/scrollElement";

export const useMoveToNeighboringChapter = (containerRef) => {
  const chaptersStore = useChaptersStore();
  const CURRENT_CHAPTER = computed(() => chaptersStore.CURRENT_CHAPTER);

  const handleKeyEvent = async (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    //TODO: Use throttle to limit key event
    if (event.key === "ArrowLeft") {
      await chaptersStore.MOVE_TO_PREVIOUS_CHAPTER();
    } else {
      await chaptersStore.MOVE_TO_NEXT_CHAPTER();
    }

    // Make sure that the DOM has been updated.
    await nextTick();
    const chapterElement = containerRef.value.querySelector(`#id-${CURRENT_CHAPTER.value.id}`);

    // Behavior: "smooth" make the window unable to scroll.
    scrollElement(chapterElement, { scrollMarginTopInRem: 7.5 }, { behavior: "auto" });
  };

  const { scrollElement } = useScrollElement();

  onMounted(() => {
    document.addEventListener("keydown", handleKeyEvent);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeyEvent);
  });
};
