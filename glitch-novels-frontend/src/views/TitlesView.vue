<template>
  <header class="mx-20 my-10">
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
      Advanced Search
    </h1>
  </header>

  <section class="mx-20 space-y-10">
    <title-list />
  </section>
</template>

<script setup>
import RegularTitleCard from "@/components/titles/cards/RegularTitleCard.vue";
import TitleList from "@/components/titles/TitleList.vue";

RegularTitleCard;
</script>
