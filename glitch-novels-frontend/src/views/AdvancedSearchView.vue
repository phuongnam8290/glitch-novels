<template>
  <div>
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
      <span> Advanced Search </span>
    </h1>

    <section class="mt-8">
      <div class="advanced-search-controls flex items-center gap-5">
        <input
          class="search-input flex-grow"
          style="font-family: 'Metropolis', FontAwesome, serif"
          type="text"
          placeholder="&#xF002; Start typing to search..."
        />

        <button class="space-x-1.5 text-lg">
          <span><i class="fa-sharp fa-solid fa-filter"></i></span>
          <span>Filter</span>
        </button>
      </div>
    </section>

    <section class="mt-8"> </section> </div
></template>

<script setup></script>

<style scoped>
input[type="text"] {
  @apply bg-gray-bg-1/80;
}

input[type="text"]::placeholder {
  @apply text-white-ink-1;
}
</style>
