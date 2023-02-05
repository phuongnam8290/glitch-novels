<template>
  <div class="grid grid-cols-1 gap-10 xl:grid-cols-2">
    <regular-title-card
      v-for="i in 10"
      :key="i"
    />
  </div>
</template>
<script setup>
import RegularTitleCard from "@/components/titles/cards/RegularTitleCard.vue";
</script>
