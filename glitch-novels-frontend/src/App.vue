<template>
  <div
    class="wrapper relative left-0 flex min-h-screen w-full flex-col justify-between"
    ref="wrapper"
  >
    <the-navigation />

    <Transition
      enter-active-class="animate__animated animate__fadeInDown animate__faster"
      leave-active-class="animate__animated animate__fadeOutUp animate__faster"
    >
      <edit-header
        v-if="IS_EDIT_MODE_ON"
        class="absolute left-0 top-20"
      />
    </Transition>

    <main class="m-20">
      <router-view> </router-view>
    </main>

    <the-footer />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useEditModeStore } from "@/stores/editMode";
import { useMoveRight } from "@/composable/animations/move-right";

import TheNavigation from "@/components/navigation/TheNavigation.vue";
import EditHeader from "@/components/edit-mode/EditHeader.vue";
import TheFooter from "@/components/navigation/TheFooter.vue";

// Move the content to the right if the sidebar opens.
const wrapper = ref(null);
useMoveRight(wrapper);

// Show the edit header if the user turns edit mode on.
const editModeStore = useEditModeStore();
const IS_EDIT_MODE_ON = computed(() => editModeStore.IS_EDIT_MODE_ON);
</script>

<style scoped>
.wrapper {
  transition: all 0.25s ease-in-out;
}
</style>
