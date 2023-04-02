<template>
  <section class="space-y-4 bg-gray-bg-1/80 p-4">
    <h2 class="section-text">Synopsis</h2>
    <div class="flex items-start gap-x-10">
      <article
        v-html="props.synopsis"
        class="flex-grow"
      >
      </article>

      <aside class="sticky top-[123px]">
        <DetailsRatings />
      </aside>
    </div>
  </section>
</template>

<script setup>
import DetailsRatings from "@/components/details/DetailsRatings.vue";

const props = defineProps({
  synopsis: {
    type: String,
    required: true,
    default: "No synopsis available.",
  },
});
</script>

<style scoped></style>
