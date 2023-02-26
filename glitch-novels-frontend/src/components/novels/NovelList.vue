<template>
  <div class="grid grid-cols-1 gap-8 xl:grid-cols-2">
    <component
      :is="IS_EDIT_MODE_ON ? EditableCard : 'div'"
      v-for="novel in novels"
      :key="novel.id"
      class="selected"
    >
      <regular-novel-card :novel="novel" />
    </component>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useEditModeStore } from "@/stores/editMode";

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
</script>
