<template>
  <button
    class="toggle-btn"
    :class="{ open: IS_SIDEBAR_OPEN }"
    ref="toggleBtn"
    @click="toggleSidebar"
  >
    <span class="toggle-btn-icon h-full w-full">
      <span class="toggle-btn-bar"></span>
    </span>
  </button>
</template>

<script setup>
import { useNavigationStore } from "@/stores/navigation";
import { computed } from "vue";

const navigationStore = useNavigationStore();
const IS_SIDEBAR_OPEN = computed(() => navigationStore.IS_SIDEBAR_OPEN);

// For toggle button click event
const toggleSidebar = () => {
  navigationStore.TOGGLE_SIDEBAR();
};
</script>

<style scoped>
/* Toggle button style */
.toggle-btn-icon {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
}

.toggle-btn-bar {
  @apply bg-white-ink-1;
  width: 1.5rem;
  height: 0.2rem;
  transition: all 0.5s ease-in-out;
}

.toggle-btn-bar:before,
.toggle-btn-bar:after {
  @apply bg-white-ink-1;
  content: "";
  position: absolute;
  left: 0;
  height: 0.2rem;
  transition: all 0.5s ease-in-out;
}

.toggle-btn-bar:before {
  width: 2.25rem;
  transform: translateY(-10px);
}

.toggle-btn-bar:after {
  width: 0.75rem;
  transform: translateY(10px);
}

/* Toggle button animation */
.toggle-btn.open .toggle-btn-bar {
  background: transparent;
}

.toggle-btn.open .toggle-btn-bar:before {
  width: 2.5rem;
  transform: rotate(45deg);
}

.toggle-btn.open .toggle-btn-bar:after {
  width: 2.5rem;
  transform: rotate(-45deg);
}

/* Toggle button hover style */
.toggle-btn:hover .toggle-btn-bar,
.toggle-btn:hover .toggle-btn-bar:before,
.toggle-btn:hover .toggle-btn-bar:after {
  @apply bg-gold-brand-1;
}

.toggle-btn.open:hover .toggle-btn-bar {
  background: transparent;
}
</style>
