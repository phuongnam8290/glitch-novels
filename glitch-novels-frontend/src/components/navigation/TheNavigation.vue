<template>
  <the-header class="fixed top-0 left-0" />
  <Transition
    enter-active-class="animate__animated animate__fadeInDown animate__faster"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster"
  >
    <edit-header
      class="fixed top-20 left-0"
      v-if="IS_EDIT_MODE_ON"
    />
  </Transition>
  <the-sidebar class="fixed top-0 left-[-13.75rem]" />
</template>

<script setup>
import { computed } from "vue";
import { useEditModeStore } from "@/stores/editMode";

import TheHeader from "@/components/navigation/TheHeader.vue";
import EditHeader from "@/components/edit-mode/EditHeader.vue";
import TheSidebar from "@/components/navigation/TheSidebar.vue";

const editModeStore = useEditModeStore();
const IS_EDIT_MODE_ON = computed(() => editModeStore.IS_EDIT_MODE_ON);
</script>

<style scoped></style>
