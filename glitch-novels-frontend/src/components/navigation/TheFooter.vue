<template>
  <footer
    class="w-full bg-gray-bg-2 px-20 py-3"
    ref="footer"
  >
    <div class="hidden items-center sm:flex">
      <img
        class="w-9"
        src="../../assets/images/common/logo-small.png"
        alt="logo"
      />
      <div class="mx-4 flex-grow border border-t-white-ink-1"></div>
      <div class="whitespace-nowrap"> Copyright © 2012-2023 Glitch Network. </div>
    </div>
    <div class="whitespace-nowrap text-center sm:hidden"> © 2012-2023 Glitch Network </div>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useNavigationStore } from "@/stores/navigation";

// Add footer to the list of navigation elements for tracking purposes.
const navigationStore = useNavigationStore();
const footer = ref(null);

onMounted(() => navigationStore.ADD_NAVIGATION_ELEMENT("footer", footer.value));
onUnmounted(() => navigationStore.REMOVE_NAVIGATION_ELEMENT("footer"));
</script>

<style scoped></style>
