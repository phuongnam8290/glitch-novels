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
import { computed, ref, watch } from "vue";
import { useEditModeStore } from "@/stores/editMode";
import { useClickOutside } from "@/composable/utils/useClickOutside";

import EditableCard from "@/components/novels/cards/EditableCard.vue";
import RegularNovelCard from "@/components/novels/cards/RegularNovelCard.vue";

defineProps({
  novels: {
    required: true,
    type: Array,
  },
});

const editModeStore = useEditModeStore();
const IS_EDIT_MODE_ON = computed(() => editModeStore.IS_EDIT_MODE_ON);

const novelList = ref([]);
const { enableClickOutside, disableClickOutside } = useClickOutside(
  novelList,
  editModeStore.CLEAR_SELECTED_DATA,
  "componentRef"
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
</script>
