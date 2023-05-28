<template>
  <button
    @click="showModal = true"
    v-bind="$attrs"
  >
    <slot name="button-icon"></slot>
  </button>

  <Teleport
    to="body"
    v-if="showModal"
  >
    <ConfirmModal>
      <template #modal-header>
        <slot name="modal-header"></slot>
      </template>
      <template #confirm-msg>
        <slot name="confirm-msg"></slot>
      </template>
      <template #confirm-item-list>
        <slot name="confirm-item-list"></slot>
      </template>
      <template #confirm-warning-msg>
        <slot name="confirm-warning-msg"></slot>
      </template>
    </ConfirmModal>
  </Teleport>
</template>

<script setup>
import { useEventBus } from "@/composable/utils/eventBus";
import { onMounted, onUnmounted, ref } from "vue";

import ConfirmModal from "@/components/common/modal/confirm-modal/ConfirmModal.vue";

const eventBus = useEventBus();
const showModal = ref(false);

onMounted(() => eventBus.on("closeModal", () => (showModal.value = false)));
onUnmounted(() => eventBus.off("closeModal"));
</script>
