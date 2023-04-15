<template>
  <button
    @click="showModal = true"
    v-bind="$attrs"
  >
    <i class="fa-sharp fa-solid fa-trash-can-xmark"></i>
  </button>

  <Teleport
    to="body"
    v-if="showModal"
  >
    <ConfirmModal>
      <template #header>
        <span>Delete novels</span>
      </template>
      <template #body>
        <div class="modal-body-content grid h-full">
          <p class="message-header">
            Are you sure you want to delete these
            <span> {{ ARRAY_SELECTED_DATA.length }} </span>
            novels:
          </p>
          <ul class="message-item-list custom-scrollbar overflow-auto italic">
            <li
              v-for="novel in ARRAY_SELECTED_DATA"
              :key="novel.id"
            >
              <p> {{ novel.title }} </p>
            </li>
          </ul>
          <div class="flex gap-x-4 border-l-4 border-orange-danger-2 bg-orange-danger-1 p-5 text-orange-danger-2">
            <span>
              <i class="fa-sharp fa-solid fa-triangle-exclamation fa-lg"></i>
            </span>
            <div>
              <h2 class="text-lg font-bold">Warning</h2>
              <p>
                By deleting these
                <span> {{ ARRAY_SELECTED_DATA.length }} </span>
                novels,
                <span> {{ numberOfChapters }} </span>
                chapters will also be delete.
              </p>
              <p class="mt-0 font-bold"> You cannot undo these action. </p>
            </div>
          </div>
        </div>
      </template>
    </ConfirmModal>
  </Teleport>
</template>

<script setup>
import { useEventBus } from "@/composable/utils/eventBus";
import { useEditModeStore } from "@/stores/editMode";
import { computed, ref } from "vue";

import ConfirmModal from "@/components/common/modal/confirm-modal/ConfirmModal.vue";

const eventBus = useEventBus();
const showModal = ref(false);
eventBus.on("closeModal", () => (showModal.value = false));

const editModeStore = useEditModeStore();
const ARRAY_SELECTED_DATA = computed(() => editModeStore.ARRAY_SELECTED_DATA);
const numberOfChapters = computed(() =>
  ARRAY_SELECTED_DATA.value.reduce((totalChapter, novel) => totalChapter + novel.chapters.length, 0)
);
</script>

<style scoped>
.modal-body-content {
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  row-gap: 1rem;
}

.modal-body-content p > span {
  font-weight: bold;
}
</style>
