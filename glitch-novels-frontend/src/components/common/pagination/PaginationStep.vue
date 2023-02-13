<template>
  <button
    class="pagination-step inline-block min-w-[3.5rem] border border-2 border-white-ink-1 py-2 px-3 text-center font-bold"
  >
    <slot>Pagination Step</slot>
  </button>
</template>

<script setup></script>

<style scoped>
.pagination-step:hover {
  @apply border-gold-brand-1 bg-gray-selected-bg text-gold-brand-1;
}
</style>
