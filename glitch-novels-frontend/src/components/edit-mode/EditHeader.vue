<template>
  <div class="edit-header z-40 flex w-full items-center justify-between bg-gold-brand-2 py-1 pl-20">
    <span class="title-text">{{ totalSelectedNovels }} novels selected</span>
    <div class="control-buttons flex">
      <button>
        <i class="fa-sharp fa-solid fa-plus fa-lg"></i>
      </button>
      <button>
        <i class="fa-sharp fa-regular fa-pen-line"></i>
      </button>
      <button>
        <i class="fa-sharp fa-regular fa-eye-slash"></i>
      </button>
      <DeleteButton v-if="totalSelectedNovels !== 0" />

      <div class="border-l">
        <button
          class="btn-close w-[5rem]"
          @click="editModeStore.TURN_OFF_EDIT_MODE"
        >
          <i class="fa-light fa-xmark fa-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useEditModeStore } from "@/stores/editMode";

import DeleteButton from "@/components/edit-mode/button/DeleteButton.vue";

const editModeStore = useEditModeStore();
const totalSelectedNovels = computed(() => editModeStore.ARRAY_SELECTED_DATA.length);
</script>

<style scoped>
.control-buttons {
  font-size: 1.5rem;
}

.control-buttons :deep(button) {
  height: 50px;
  width: 50px;
}

.control-buttons :deep(button ~ button) {
  margin-left: 1rem;
}

.control-buttons :deep(button:last-of-type) {
  margin-right: 1rem;
}

.control-buttons .btn-close {
  margin: 0 calc((5rem - 50px) / 2);
}
</style>
