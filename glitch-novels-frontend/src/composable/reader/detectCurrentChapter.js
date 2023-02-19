import { computed } from "vue";
import { useChaptersStore } from "@/stores/chapter";

// When using pinia store outside component, we must put its creation inside a function to defer calls after pinia has
// been installed.
const chaptersStore = () => useChaptersStore();

let parentRef = null;
const setParentRef = (elementRef) => {
  parentRef = elementRef;
};

const CURRENT_CHAPTER = computed(() => chaptersStore().CURRENT_CHAPTER);
const currentChapterElement = computed(() => {
  const id = `id-${CURRENT_CHAPTER.value.id}`;
  return parentRef.value.querySelector(`#${id}`);
});

// If the current chapter gets outside bound (about up or down 40% viewport), set the new current chapter based on the
// old one's direction.
const setNewCurrentChapter = () => {
  const viewportHeight = window.innerHeight;
  const padding = viewportHeight * 0.4;
  const boundingClientRect = currentChapterElement.value.getBoundingClientRect();

  // If the old chapter moves up 40% of the viewport, then the new current chapter will be the one below it.
  if (boundingClientRect.bottom < padding) {
    chaptersStore().SET_CURRENT_CHAPTER("up");
    return;
  }

  // If the old chapter moves down 40% of the viewport, then the new current chapter will be the one above it.
  if (boundingClientRect.top > viewportHeight - padding) {
    chaptersStore().SET_CURRENT_CHAPTER("down");
  }
};

export { setParentRef, setNewCurrentChapter };
