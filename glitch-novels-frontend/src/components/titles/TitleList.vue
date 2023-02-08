<template>
  <div class="grid grid-cols-1 gap-10 xl:grid-cols-2">
    <regular-title-card
      v-for="title in titles"
      :key="title.id"
      :title="title"
    />
  </div>
</template>
<script setup>
defineProps({
  titles: {
    required: true,
    type: Array,
  },
});
import RegularTitleCard from "@/components/titles/cards/RegularTitleCard.vue";
</script>
