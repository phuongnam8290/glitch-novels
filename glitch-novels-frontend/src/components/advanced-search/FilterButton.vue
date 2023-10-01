<template>
  <button
    class="space-x-1.5 text-lg"
    v-bind="$attrs"
    @click="showFilterModal = true"
  >
    <span><i class="fa-sharp fa-solid fa-filter"></i></span>
    <span>Filter</span>
  </button>

  <FilterModal
    v-if="showFilterModal"
    @close-search-modal="closeSearchModal"
  />
</template>

<script setup>
import { useEventBus } from "@/composable/utils/eventBus";
import { onMounted, onUnmounted, ref } from "vue";

import FilterModal from "@/components/advanced-search/FilterModal.vue";

const eventBus = useEventBus();
const showFilterModal = ref(false);

const closeSearchModal = () => (showFilterModal.value = false);

onMounted(() => eventBus.on("closeBaseModal", closeSearchModal));
onUnmounted(() => eventBus.off("closeBaseModal"));
</script>

<style scoped></style>
