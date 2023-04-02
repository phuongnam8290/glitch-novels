<template>
  <MainHeader class="sticky top-0 left-0" />

  <Transition
    enter-active-class="animate__animated animate__fadeInDown animate__faster"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster"
  >
    <EditHeader
      v-if="IS_EDIT_MODE_ON"
      class="sticky left-0 top-20"
    />
  </Transition>
</template>

<script setup>
import { computed } from "vue";
import { useEditModeStore } from "@/stores/editMode";

import MainHeader from "@/components/navigation/header/MainHeader.vue";
import EditHeader from "@/components/edit-mode/EditHeader.vue";

const editStore = useEditModeStore();
const IS_EDIT_MODE_ON = computed(() => editStore.IS_EDIT_MODE_ON);
</script>
