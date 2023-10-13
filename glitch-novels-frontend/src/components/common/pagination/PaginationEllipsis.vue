<template>
  <div class="pagination-ellipsis inline-block">
    <span
      class="inline-block min-w-[3.5rem] cursor-pointer border-2 border-transparent py-2 text-center hover:text-gold-brand-1"
      v-if="!isInputVisible"
      @click="showInput"
    >
      <i class="fa-sharp fa-solid fa-ellipsis fa-2xl"></i>
    </span>
    <input
      type="text"
      class="w-[3.5rem] min-w-[3.5rem] border-gold-brand-1 bg-gray-selected-bg font-bold"
      ref="input"
      v-else
      @keydown="handleKeyPress"
      @input="changeWidth"
      @blur="confirmInput"
    />
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";

const emit = defineEmits(["changePage"]);

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

  // CharCode 13 is enter key. Emit event with current input's value.
  if (charCode === 13) {
    confirmInput(event);
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

// Emit change page event when input lost focus or when enter key pressed.
const confirmInput = (event) => {
  const pageNumber = Number.parseInt(event.currentTarget.value);

  // Only emit when the value is a positive number. If not, set the value to an empty string.
  if (pageNumber > 0) {
    emit("changePage", pageNumber);
  } else {
    event.currentTarget.value = "";
  }

  isInputVisible.value = false;
};
</script>

<style scoped>
input[type="text"] {
  @apply border-2 py-2 px-3;
}

input:focus {
  @apply outline-0;
}
</style>
