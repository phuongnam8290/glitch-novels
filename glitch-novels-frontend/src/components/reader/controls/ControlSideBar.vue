<template>
  <aside>
    <div
      class="control-contents my-auto overflow-hidden"
      :class="{ open: isOpen }"
      ref="controlContents"
    >
      <component
        :is="displayedComponent.component ? displayedComponent.component : 'div'"
        class="mx-4 bg-gray-bg-2"
        @close="isOpen = false"
      />
    </div>

    <ul class="control-commands my-auto w-[50px]">
      <li
        class="control-icon h-[50px] bg-gray-bg-2"
        @click="toggleControlDetails($event, ControlToc)"
      >
        <button class="h-full w-full">
          <i class="fa-sharp fa-regular fa-rectangle-list fa-lg"></i>
        </button>
      </li>
      <li class="control-icon h-[50px] bg-gray-bg-2">
        <button class="h-full w-full">
          <i class="fa-sharp fa-regular fa-gear fa-lg"></i>
        </button>
      </li>
      <li class="control-icon h-[50px] bg-gray-bg-2">
        <button class="h-full w-full">
          <i class="fa-sharp fa-regular fa-bookmark fa-lg"></i>
        </button>
      </li>
      <li class="control-icon h-[50px] bg-gray-bg-2">
        <button class="h-full w-full">
          <i class="fa-sharp fa-regular fa-comments fa-lg"></i>
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed, ref, shallowRef, watch } from "vue";
import { useNavigationStore } from "@/stores/navigation";

import ControlToc from "@/components/reader/controls/ControlToc.vue";

// Toggle sidebar open/close based on the state of the left sidebar.
const navigationsStore = useNavigationStore();
const isOpen = ref(false);

// If this sidebar open, close the left sidebar.
const displayedComponent = shallowRef({ component: null });
const controlContents = ref(null);
const toggleControlDetails = (event, comp) => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    navigationsStore.CLOSE_SIDEBAR();
  }

  displayedComponent.value = { component: comp };
};

// If the left sidebar open, close this sidebar.
const IS_SIDEBAR_OPEN = computed(() => navigationsStore.IS_SIDEBAR_OPEN);
watch(IS_SIDEBAR_OPEN, (isSidebarOpen) => {
  if (isSidebarOpen) {
    isOpen.value = false;
  }
});
</script>

<style scoped>
.control-contents {
  height: calc(100% - 2rem);
  max-width: 0;
  transition: 0.25s;
}

/* Make sure that the control-details take all remaining width. The subtracting spaces are 10rem for the section's
margin, 1280px for the reader's width, 50px for control-commands' width, and 2rem for control-details' padding. */
.control-contents.open {
  max-width: calc(100vw - 10rem - 1280px - 50px - 2rem);
}
</style>
