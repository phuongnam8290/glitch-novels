import { useChaptersStore } from "@/stores/chapter";
import { computed } from "vue";

// When using pinia store outside component, we must put its creation inside a function to defer calls after pinia has
// been installed.
const chaptersStore = () => useChaptersStore();
let parentRef = null;

const setParentRef = (elementRef) => {
  parentRef = elementRef;
};

// Fetch & display a new chapter, then scrolls up a small distance to signify to the user that a new chapter has been
// loaded.
const loadPreviousChapter = async () => {
  // Save current document's height. Necessary for calculate scrolling position.
  const body = document.documentElement;
  const initialHeight = body.scrollHeight;

  // Add the previous chapter to the list.
  await chaptersStore().ADD_PREVIOUS_CHAPTER();

  // Calculate the new chapter height.
  const previousChapterHeight = body.scrollHeight - initialHeight;

  // Scrolls up a small distance to signify to the user that a new chapter has been loaded.
  body.scrollTop = previousChapterHeight;
  window.scrollTo({
    top: previousChapterHeight - 300,
    behavior: "smooth",
  });
};

// Load a new chapter when scrolling past the top of the page.
const HAS_PREVIOUS_CHAPTER = computed(() => chaptersStore().HAS_PREVIOUS_CHAPTER);

const loadPreviousChapterByMouseWheel = async (event) => {
  // Check if the user scrolls up and the current position reaches the top of the page.
  if (
    event.deltaY < 0 && //
    parentRef.value.getBoundingClientRect().top > 0 &&
    HAS_PREVIOUS_CHAPTER.value
  ) {
    await loadPreviousChapter();
  }
};

const loadPreviousChapterByArrowUpKey = async (event) => {
  // Check if the user press the arrow up key and the current position reaches the top of the page,
  if (
    event.keyCode === 38 && //
    parentRef.value.getBoundingClientRect().top > 0 &&
    HAS_PREVIOUS_CHAPTER.value
  ) {
    await loadPreviousChapter();
  }
};

export { setParentRef, loadPreviousChapterByMouseWheel, loadPreviousChapterByArrowUpKey };
