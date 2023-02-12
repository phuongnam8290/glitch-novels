<template>
  <section class="space-y-4 bg-gray-bg-1 p-4">
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
import { ref, onMounted } from "vue";

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

const content = ref(null);
const expandBtn = ref(null);
const isCollapse = ref(false);

onMounted(() => {
  const scrollHeight = content.value.scrollHeight;

  // If the content is longer than the pre-defined height, set up styles. If not, remove unnecessary elements.
  if (scrollHeight > props.collapsedHeight) {
    // Set css variables to hide overflowed content.
    content.value.style.setProperty("--scroll-height", `${scrollHeight}px`);
    content.value.style.setProperty("--collapsed-height", `${props.collapsedHeight}px`);

    // Signify that the content is collapsed.
    isCollapse.value = true;
  } else {
    expandBtn.value.remove();
  }
});

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
