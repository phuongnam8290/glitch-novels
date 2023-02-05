<template>
  <div class="pagination-ellipsis inline-block">
    <span
      class="inline-block min-w-[3.5rem] cursor-pointer py-2 text-center hover:text-gold-brand-1"
      v-if="!isInputVisible"
      @click="showInput"
    >
      <i class="fa-sharp fa-solid fa-ellipsis fa-2xl"></i>
    </span>
    <input
      type="text"
      class="w-[3.5rem] min-w-[3.5rem] border border-2 border-white-ink-1 bg-transparent py-2 px-3 font-bold"
      ref="input"
      v-else
      @keydown="handleKeyPress"
      @input="changeWidth"
      @blur="isInputVisible = false"
    />
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";

const input = ref(null);
const isInputVisible = ref(false);

// Show input and focus on it.
const showInput = async () => {
  isInputVisible.value = true;

  await nextTick();
  input.value.focus();
};

// Only allow numeric, enter, backspace values inside the input field.
const handleKeyPress = (event) => {
  const charCode = event.which ? event.which : event.keyCode;

  // CharCode 13 is enter key.
  if (charCode === 13) {
    // TODO: Change page on enter keypress
    console.log("Enter key press!");
    return;
  }

  // CharCode 8 is backspace key.
  if (charCode === 8) {
    console.log("Backspace key press!");
    return;
  }

  // If the entered key is not numeric. Do not allow.
  // 48 -> 57 are numeric keys. 96 -> 105 are numpad keys.
  if ((charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
    event.preventDefault();
  }
};

// Change the input width when its value changed.
const changeWidth = (event) => {
  event.currentTarget.style.width = `${event.currentTarget.value.length + 2}ch `;
};
</script>

<style scoped>
input:focus {
  @apply outline-0;
}
</style>
