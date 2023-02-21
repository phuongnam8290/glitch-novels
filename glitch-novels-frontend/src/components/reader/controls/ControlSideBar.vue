<template>
  <aside :class="{ open: isOpen }">
    <ul class="control-bar fixed top-[5rem] right-20 flex w-[50px] flex-col justify-center">
      <li
        class="control-icon h-[50px] bg-gray-bg-2"
        @click="toggleControlDetails($event, `toc`)"
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

    <div class="control-details fixed top-[6.25rem] right-40 whitespace-nowrap bg-gray-bg-2">
      <control-toc />
    </div>
  </aside>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useNavigationStore } from "@/stores/navigation";

import ControlToc from "@/components/reader/controls/ControlToc.vue";

const navigationsStore = useNavigationStore();
const isOpen = ref(false);

const toggleControlDetails = (event, controlName) => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    navigationsStore.CLOSE_SIDEBAR();
  }
};

const IS_SIDEBAR_OPEN = computed(() => navigationsStore.IS_SIDEBAR_OPEN);
watch(IS_SIDEBAR_OPEN, (isSidebarOpen) => {
  if (isSidebarOpen) {
    isOpen.value = false;
  }
});
</script>

<style scoped>
aside {
  width: 0;
  transition: all 0.25s ease-in-out;
}

aside.open {
  width: calc(100vw - 10rem - 1200px);
}

aside .control-bar {
  height: calc(100vh - 5rem);
  transition: all 0.25s ease-in-out;
}

aside .control-details {
  width: 0;
  opacity: 0;
  height: calc(100vh - 6.25rem - 1.25rem);
  transition: all 0.25s ease-in-out;
}

aside.open .control-details {
  opacity: 1;
  width: calc(100vw - 10rem - 1200px - 8rem);
}
</style>
