<template>
  <div
    class="wrapper relative"
    :class="selectedStyle"
    @click="toggleSelectId"
  >
    <div class="overlay absolute top-0 left-0 z-20 h-full w-full">
      <div
        class="select-outer-circle absolute top-3 left-3 flex cursor-pointer items-center justify-center rounded-full"
      >
        <div class="select-inner-circle h-[80%] w-[80%] rounded-full"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { number, object, string } from "yup";

import { computed } from "vue";
import { useEditModeStore } from "@/stores/editMode";

const props = defineProps({
  novel: {
    type: Object,
    required: true,
    validator(value) {
      const schema = object({
        id: number().required(),
        title: string().required(),
      });

      try {
        schema.validate(value);
        return true;
      } catch (error) {
        console.warn(error.errors);
        return false;
      }
    },
  },
});

const editModeStore = useEditModeStore();
const novel = computed(() => props.novel);
const toggleSelectId = () => editModeStore.TOGGLE_SELECTED_DATA(novel.value);

const HAS_VALUE = computed(() => editModeStore.HAS_VALUE);
const selectedStyle = computed(() => ({
  selected: HAS_VALUE.value(novel.value),
}));
</script>

<style scoped>
.wrapper {
  border: 2px solid transparent;
}

.wrapper.selected {
  border-color: theme("colors[gold-brand-1]");
}

.wrapper.selected .select-inner-circle {
  background-color: theme("colors[gold-brand-1]");
}

.overlay {
  opacity: 0;
  background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.8) 10%, transparent 20%);
  transition: opacity 0.25s ease-in-out;
}

.overlay:hover {
  opacity: 1;
}

.select-outer-circle {
  width: 25px;
  height: 25px;
  border: 2px solid theme("colors[white-ink-1]");
}
</style>
