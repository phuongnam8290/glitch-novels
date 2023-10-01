<template>
  <div>
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
      <span> Advanced Search </span>
    </h1>

    <section class="mt-8">
      <div class="advanced-search-controls flex items-center gap-5">
        <SearchTitleInput />
        <FilterButton />
      </div>
    </section>

    <section class="mt-8"> </section>
  </div>
</template>

<script setup>
import SearchTitleInput from "@/components/advanced-search/SearchTitleInput.vue";
import FilterButton from "@/components/advanced-search/FilterButton.vue";
</script>

<style scoped></style>
