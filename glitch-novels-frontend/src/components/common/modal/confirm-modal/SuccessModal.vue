<template>
  <div class="modal-success mb-10 flex w-[25vw] min-w-[400px] flex-col space-y-10">
    <img
      src="../../../../assets/images/modal/success.png"
      class="w-full object-contain"
      alt="success header image"
    />

    <div class="modal-message px-10">
      <p class="section-text"> Great! </p>
      <p>
        <slot name="success-msg"> Your operation has been performed successfully. </slot>
      </p>
      <p> You can continue browsing now. </p>
    </div>

    <button
      class="text-btn w-[200px] self-center border-blue-success-1 bg-blue-success-1 hover:border-blue-success-2 hover:bg-blue-success-2 hover:text-white-ink-1"
      @click.stop="eventBus.emit('closeModal')"
    >
      Continue
    </button>
  </div>
</template>

<script setup>
import { useEventBus } from "@/composable/utils/eventBus";
const eventBus = useEventBus();
</script>

<style scoped></style>
