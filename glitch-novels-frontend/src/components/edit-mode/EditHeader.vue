<template>
  <div
    class="edit-header z-40 flex w-full items-center justify-between bg-gold-brand-2 py-1 pl-20"
    ref="editHeader"
  >
    <span class="title-text">{{ ARRAY_SELECTED_DATA.length }} items selected</span>
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
      <button>
        <i class="fa-sharp fa-solid fa-trash-can-xmark"></i>
      </button>

      <div class="border-l">
        <button
          class="btn-close w-[5rem]"
          @click="editMode = false"
        >
          <i class="fa-light fa-xmark fa-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditModeStore } from "@/stores/editMode";
import { useNavigationStore } from "@/stores/navigation";

const editModeStore = useEditModeStore();
const { editMode, ARRAY_SELECTED_DATA } = storeToRefs(editModeStore);

// Add this component to the navigation store for tracking purposes.
const navigationStore = useNavigationStore();
const { navigationElements } = storeToRefs(navigationStore);
const editHeader = ref(null);
onMounted(() => navigationElements.value.set("editHeader", editHeader.value));
onUnmounted(() => navigationElements.delete("editHeader"));
</script>

<style scoped>
.control-buttons {
  font-size: 1.5rem;
}

.control-buttons button {
  height: 50px;
  width: 50px;
}

.control-buttons button ~ button {
  margin-left: 1rem;
}

.control-buttons > button:last-of-type {
  margin-right: 1rem;
}

.control-buttons .btn-close {
  margin: 0 calc((5rem - 50px) / 2);
}
</style>
