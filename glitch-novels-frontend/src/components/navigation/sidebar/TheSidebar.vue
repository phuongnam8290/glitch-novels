<template>
  <nav
    class="sidebar overflow-hidden bg-gray-bg-2"
    :class="{ open: IS_SIDEBAR_OPEN }"
    ref="sidebar"
  >
    <Teleport
      to="#sidebar-toggle-button"
      v-if="isMainHeaderMounted"
    >
      <SidebarToggleButton
        class="sidebar-toggle-button"
        :class="{ open: IS_SIDEBAR_OPEN }"
        @click="navigationStore.TOGGLE_SIDEBAR"
        ref="sidebarToggleButton"
      />
    </Teleport>
    <SidebarContents />
  </nav>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useNavigationStore } from "@/stores/navigation";
import { useClickOutside } from "@/composable/utils/clickOutside";
import { useEventBus } from "@/composable/utils/eventBus";

import SidebarToggleButton from "@/components/navigation/sidebar/SidebarToggleButton.vue";
import SidebarContents from "@/components/navigation/sidebar/SidebarContents.vue";

// Open / close sidebar base on state set in navigationStore
const navigationStore = useNavigationStore();
const IS_SIDEBAR_OPEN = computed(() => navigationStore.IS_SIDEBAR_OPEN);

// Close the sidebar when clicking outside of it.
const sidebar = ref(null);
const sidebarToggleButton = ref(null);
const { enableClickOutside, disableClickOutside } = useClickOutside(sidebar, navigationStore.CLOSE_SIDEBAR, {
  ignoredElementRefs: computed(() => [sidebarToggleButton.value.domElement]),
});
onMounted(() => enableClickOutside());
onUnmounted(() => disableClickOutside());

// Wait for the main header to be mounted before teleporting the sidebar toggle button.
const isMainHeaderMounted = ref(false);
const { eventBus } = useEventBus();
eventBus.on("mainHeaderMounted", () => (isMainHeaderMounted.value = true));
</script>

<style scoped>
.sidebar-toggle-button.open {
  margin-left: calc(-5rem - 18px);
}

.sidebar {
  transition: all 0.25s ease-in-out;
  width: 0;
}

.sidebar.open {
  width: 20rem;
}
</style>
