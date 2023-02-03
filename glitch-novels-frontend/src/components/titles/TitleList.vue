<template>
  <div class="columns-1 gap-14 space-y-14 xl:columns-2">
    <regular-title-card
      v-for="i in 10"
      :key="i"
    />
  </div>
</template>
<script setup>
import RegularTitleCard from "@/components/titles/cards/RegularTitleCard.vue";
</script>
