<template>
  <div class="grid grid-cols-1 gap-8 xl:grid-cols-2">
    <RegularNovelCard
      v-for="novel in novels"
      :key="novel.id"
      :novel="novel"
    />
  </div>
</template>
<script setup>
defineProps({
  novels: {
    required: true,
    type: Array,
  },
});
import RegularNovelCard from "@/components/novels/cards/RegularNovelCard.vue";
</script>
