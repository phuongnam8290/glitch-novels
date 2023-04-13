<template>
  <div class="modal-failure mb-10 flex w-[25vw] min-w-[400px] flex-col space-y-10">
    <img
      src="../../../../assets/images/modal/failure.png"
      class="w-full object-contain"
      alt="failure header image"
    />

    <div class="modal-message px-10">
      <p class="section-text"> Oh snap! </p>
      <p>{{ props.failureMsg }}</p>
      <p> Keep calm and try again. </p>
    </div>

    <button
      class="text-btn w-[200px] self-center border-red-danger-1 bg-red-danger-1 hover:border-red-danger-2 hover:bg-red-danger-2 hover:text-white-ink-1"
      @click.stop="$emit('retryAction')"
    >
      Try again
    </button>
  </div>
</template>

<script setup>
defineEmits(["retryAction"]);

const props = defineProps({
  failureMsg: {
    type: String,
    required: false,
    default: "There is something wrong.",
  },
});
</script>

<style scoped></style>
