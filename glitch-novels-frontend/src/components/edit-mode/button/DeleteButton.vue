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
  </ConfirmableButton>
</template>

<script setup>
import { deleteNovels } from "@/api/novel";
import { useEditModeStore } from "@/stores/editMode";
import { computed, provide } from "vue";
import { useEventBus } from "@/composable/utils/eventBus";

import ConfirmableButton from "@/components/common/button/ConfirmableButton.vue";

const editModeStore = useEditModeStore();
const ARRAY_SELECTED_DATA = computed(() => editModeStore.ARRAY_SELECTED_DATA);
const totalSelectedINovels = computed(() => ARRAY_SELECTED_DATA.value.length);
const numberOfChapters = computed(() =>
  ARRAY_SELECTED_DATA.value.reduce((totalChapter, novel) => totalChapter + novel.chapters.length, 0)
);

// Provide delete novel action for child modal.
const eventBus = useEventBus();
// const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const deleteAction = () => {
  return new Promise((resolve, reject) => {
    const deleteAction = deleteNovels(ARRAY_SELECTED_DATA.value.map((novel) => novel.id));

    // Using tradition then/catch because it is an anti-pattern to use async/await inside of a new Promise() constructor
    deleteAction
      .then((response) => {
        // Clear deleted novels from the selected list; if not doing this, the subsequence call to delete action will
        // have already deleted novels in its selected list.
        editModeStore.CLEAR_SELECTED_DATA();

        // Emit reloads current page when delete successfully.
        eventBus.emit("reloadPage");
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

provide("action", deleteAction);
</script>
