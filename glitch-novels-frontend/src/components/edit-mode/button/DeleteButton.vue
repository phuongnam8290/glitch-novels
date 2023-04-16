<template>
  <ConfirmableButton>
    <template #button-icon>
      <i class="fa-sharp fa-solid fa-trash-can-xmark"></i>
    </template>

    <template #modal-header> Delete novels </template>

    <template #confirm-msg>
      Are you sure you want to delete these
      <span class="font-bold"> {{ totalSelectedINovels }} </span>
      novels:
    </template>

    <template #confirm-item-list>
      <li
        v-for="novel in ARRAY_SELECTED_DATA"
        :key="novel.id"
      >
        <p> {{ novel.title }} </p>
      </li>
    </template>

    <template #confirm-warning-msg>
      <p>
        By deleting these
        <span class="font-bold"> {{ totalSelectedINovels }} </span>
        novels,
        <span class="font-bold"> {{ numberOfChapters }} </span>
        chapters will also be delete.
      </p>
      <p class="mt-0 font-bold"> You cannot undo these action. </p>
    </template>

    <template #success-msg>
      <span class="font-bold"> {{ totalSelectedINovels }} </span>
      novels was deleted successfully.
    </template>

    <template #failure-msg> Cannot delete selected novels. </template>
  </ConfirmableButton>
</template>

<script setup>
import { useEditModeStore } from "@/stores/editMode";
import { computed } from "vue";

import ConfirmableButton from "@/components/common/button/ConfirmableButton.vue";

const editModeStore = useEditModeStore();
const ARRAY_SELECTED_DATA = computed(() => editModeStore.ARRAY_SELECTED_DATA);
const totalSelectedINovels = computed(() => ARRAY_SELECTED_DATA.value.length);
const numberOfChapters = computed(() =>
  ARRAY_SELECTED_DATA.value.reduce((totalChapter, novel) => totalChapter + novel.chapters.length, 0)
);
</script>
