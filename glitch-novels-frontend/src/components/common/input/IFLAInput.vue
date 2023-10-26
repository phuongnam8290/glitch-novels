<template>
  <div class="form-group relative">
    <input
      type="text"
      class="input-text h-12 w-full"
      :placeholder="placeholder"
      :id="id"
    />
    <label
      :for="id"
      class="input-label subtitle-text absolute z-10 text-gold-brand-1"
      >{{ placeholder }}</label
    >
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.input-label {
  top: 16px;
  left: 17px;
  transition: 0.2s;
  pointer-events: none;
  opacity: 0;
}

.input-text:focus::placeholder {
  opacity: 0;
  transition: 0.4s;
}

.input-text:focus,
.input-text:not(:placeholder-shown).input-text:not(:focus) {
  @apply pt-6 pb-2;
}

.input-text:focus + .input-label,
.input-text:not(:placeholder-shown).input-text:not(:focus) + .input-label {
  opacity: 1;
  top: 5px;
  transition: 0.2s;
}
</style>
