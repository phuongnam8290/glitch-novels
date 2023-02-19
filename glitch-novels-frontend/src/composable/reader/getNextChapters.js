import { computed } from "vue";
import { useChaptersStore } from "@/stores/chapter";

// When using pinia store outside component, we must put its creation inside a function to defer calls after pinia has
// been installed.
const chaptersStore = () => useChaptersStore();
let parentRef = null;

const setParentRef = (elementRef) => {
  parentRef = elementRef;
};

let nextIndicatorRef = null;
const setNextIndicatorRef = (elementRef) => {
  nextIndicatorRef = elementRef;
};

// Determine if should fetch new chapters or not
const HAS_NEXT_CHAPTER = computed(() => chaptersStore().HAS_NEXT_CHAPTER);

const shouldLoadMoreNextChapter = () => {
  // If the distance between the current position and the end of the page is smaller than the nextIndicator height +
  // padding height, then add new chapters. If not, then stop. Doing this will make the nextIndicator element pushed
  // down far enough so that the next time user scrolls down near the end of the page, the intersection observer
  // callback will be called again.
  const wrapperHeightFromViewportToBottom = parentRef.value.getBoundingClientRect().bottom;
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
    await chaptersStore().ADD_NEXT_CHAPTER();
  }
};

export { setParentRef, setNextIndicatorRef, loadNextChapters };
