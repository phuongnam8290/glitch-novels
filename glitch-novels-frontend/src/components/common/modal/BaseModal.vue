<template>
  <div
    class="overlay fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center"
    ref="overlay"
    @click.stop
  >
    <div
      class="modal-wrapper relative bg-gray-bg-1/80"
      ref="modalWrapper"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useEventBus } from "@/composable/utils/eventBus";
import { useClickOutside } from "@/composable/utils/clickOutside";
import { onMounted, onUnmounted, ref } from "vue";

// Emit the closeModal event when the user clicks the close button or outside the modal.
const eventBus = useEventBus();
const emitCloseBaseModal = () => eventBus.emit("clickOutsideModal");

const overlay = ref(null);
const modalWrapper = ref(null);
const { enableClickOutside } = useClickOutside(
  modalWrapper,
  () => {
    emitCloseBaseModal();
  },
  { parentElementRef: overlay }
);
onMounted(() => enableClickOutside());

// Prevent scroll when modals open.
onMounted(() => (document.getElementsByTagName("body")[0].style.overflow = "hidden"));
onUnmounted(() => (document.getElementsByTagName("body")[0].style.overflow = ""));
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  overscroll-behavior: contain;
}

.modal-wrapper {
  transition: height 0.25s ease-in-out;
}
</style>
