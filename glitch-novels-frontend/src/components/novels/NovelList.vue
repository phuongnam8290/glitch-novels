<template>
  <div class="grid grid-cols-1 gap-8 xl:grid-cols-2">
    <component
      :is="IS_EDIT_MODE_ON ? EditableCard : 'div'"
      v-for="novel in novels"
      :key="novel.id"
      :novel="novel"
      ref="novelList"
    >
      <regular-novel-card :novel="novel" />
    </component>
  </div>
</template>
<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { useEditModeStore } from "@/stores/editMode";
import { useNavigationStore } from "@/stores/navigation";
import { useClickOutside } from "@/composable/utils/useClickOutside";

import EditableCard from "@/components/edit-mode/EditableCard.vue";
import RegularNovelCard from "@/components/novels/cards/RegularNovelCard.vue";

defineProps({
  novels: {
    required: true,
    type: Array,
  },
});

const editModeStore = useEditModeStore();
const IS_EDIT_MODE_ON = computed(() => editModeStore.IS_EDIT_MODE_ON);

const navigationStore = useNavigationStore();
const NAVIGATION_ELEMENTS = computed(() => navigationStore.NAVIGATION_ELEMENTS);

const novelList = ref([]);
const { enableClickOutside, disableClickOutside } = useClickOutside(
  novelList,
  editModeStore.CLEAR_SELECTED_DATA,
  "componentRef",
  computed(() => [...NAVIGATION_ELEMENTS.value.values()])
);

watch(
  IS_EDIT_MODE_ON,
  (isOn) => {
    if (isOn) {
      enableClickOutside();
    } else {
      disableClickOutside();
    }
  },
  { immediate: true }
);

onUnmounted(() => disableClickOutside());
</script>
