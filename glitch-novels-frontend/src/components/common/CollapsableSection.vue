<template>
  <section class="space-y-4 bg-gray-bg-1/80 p-4">
    <slot name="title"></slot>
    <article
      ref="content"
      class="content"
      :class="{ collapsed: isCollapse }"
    >
      <slot name="content"></slot>
    </article>

    <button
      class="expand-btn flex w-full justify-center"
      :class="{ hidden: scrollHeight < props.collapsedHeight }"
      ref="expandBtn"
      @click="toggleExpand"
    >
      <template v-if="isCollapse">
        <span> {{ props.expandText }} </span>
        <span class="ml-2">
          <i class="fa-solid fa-chevrons-down fa-xs"></i>
        </span>
      </template>

      <template v-else>
        <span> {{ props.collapseText }} </span>
        <span class="ml-2">
          <i class="fa-solid fa-chevrons-up fa-xs"></i>
        </span>
      </template>
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  expandText: {
    type: String,
    required: false,
    default: "Show more",
  },
  collapseText: {
    type: String,
    required: false,
    default: "Show less",
  },
  collapsedHeight: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["changeScrollHeight"]);

let resizeObserver = null;
const content = ref(null);

onMounted(() => {
  // Initialize resizeObserver & begin to observe changes in the content's dimension.
  resizeObserver = new ResizeObserver(setScrollHeightVariable);
  resizeObserver.observe(content.value);

  content.value.style.setProperty("--collapsed-height", `${props.collapsedHeight}px`);
});

const scrollHeight = ref(0);
let currenContentWidth = null;

// ResizeObserver's callback function, invoked once on mounted circle hook since the resizeObserver began to observe the
// content in its & when the content's dimension changed.
const setScrollHeightVariable = () => {
  const newContentWidth = content.value.offsetWidth;

  // If the content's width does not change, do nothing.
  if (currenContentWidth === newContentWidth) {
    return;
  }

  // Recalculate the scrollHeight when the content's width changes. Always do once in the mounted circle hook since the
  // currentContentWidth variable at that time is null.
  scrollHeight.value = content.value.scrollHeight + 1;
  content.value.style.setProperty("--scroll-height", `${scrollHeight.value}px`);

  // After changing scrollHeight, emit an event to parent. Useful if the parent wants to alter expand/collapse messages
  // based on scrollHeight stat.
  emit("changeScrollHeight");
};

onUnmounted(() => {
  // Stop observing changes in the content's dimension.
  resizeObserver.disconnect();
});

// The component collapsed by default.
const isCollapse = ref(true);

// Handle expand button click event.
const toggleExpand = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped>
.content {
  position: relative;
  overflow: hidden;
  max-height: var(--scroll-height);
  transition: all 0.25s ease-in-out;
}

.content.collapsed {
  max-height: var(--collapsed-height);
  transition: all 0.25s ease-in-out;
}
</style>
