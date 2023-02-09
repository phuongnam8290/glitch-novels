<template>
  <button
    class="pagination-item inline-block min-w-[3.5rem] border border-2 border-white-ink-1 py-2 px-3 text-center font-bold"
  >
    <slot>1</slot>
  </button>
</template>

<script setup></script>

<style scoped>
.pagination-item:hover {
  @apply border-gold-brand-1 text-gold-brand-1;
}

.pagination-item.active {
  @apply border-gold-brand-2 bg-gold-brand-2;
}

.pagination-item.active:hover {
  @apply text-white-ink-1;
}
</style>
