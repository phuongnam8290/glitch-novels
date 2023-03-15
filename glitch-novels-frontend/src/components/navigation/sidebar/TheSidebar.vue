<template>
  <teleport
    to="#sidebar-toggle-button"
    v-if="isMainHeaderMounted"
  >
    <sidebar-toggle-button
      class="sidebar-toggle-button"
      :class="{ open: IS_SIDEBAR_OPEN }"
      @click="navigationStore.TOGGLE_SIDEBAR"
    />
  </teleport>
  <sidebar-contents
    v-bind="$attrs"
    class="sidebar-contents"
    :class="{ open: IS_SIDEBAR_OPEN }"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useNavigationStore } from "@/stores/navigation";
import { useEventBus } from "@/composable/utils/useEventBus";

import SidebarToggleButton from "@/components/navigation/sidebar/SidebarToggleButton.vue";
import SidebarContents from "@/components/navigation/sidebar/SidebarContents.vue";

const navigationStore = useNavigationStore();
const IS_SIDEBAR_OPEN = computed(() => navigationStore.IS_SIDEBAR_OPEN);

// Wait for the main header to be mounted before teleporting the sidebar toggle button.
const isMainHeaderMounted = ref(false);
const { eventBus } = useEventBus();
eventBus.on("mainHeaderMounted", () => (isMainHeaderMounted.value = true));
</script>

<style scoped>
.sidebar-toggle-button.open {
  margin-left: calc(-5rem - 18px);
}

.sidebar-contents {
  transition: all 0.25s ease-in-out;
  width: 0;
}

.sidebar-contents.open {
  width: 20rem;
}
</style>
