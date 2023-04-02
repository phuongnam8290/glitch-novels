<template>
  <CollapsableSection
    :collapsed-height="genresCollapsedHeight"
    :expand-text="genresExpandText"
    @change-scroll-height="renderGenresExpandText"
  >
    <template #title>
      <h2 class="section-text"> Genres </h2>
    </template>

    <template #content>
      <ul
        class="flex flex-wrap gap-4"
        ref="genreList"
      >
        <li
          v-for="genre in props.genres"
          :key="genre.id"
        >
          <TheTag> {{ genre.title }} </TheTag>
        </li>
      </ul>
    </template>
  </CollapsableSection>
</template>

<script setup>
import { ref } from "vue";
import { countVerticalOverflowedChildren } from "@/utils/countHiddenChildren";

import CollapsableSection from "@/components/common/CollapsableSection.vue";
import TheTag from "@/components/common/tag/TheTag.vue";
import { array, number, object, string } from "yup";

const props = defineProps({
  genres: {
    type: Array,
    required: true,
    validator(value) {
      const schema = array().of(
        object({
          id: number().required().positive(),
          title: string().required(),
          description: string().required(),
        })
      );

      try {
        schema.validateSync(value);
      } catch (error) {
        console.warn(error.errors);
        return false;
      }

      return true;
    },
  },
});

const genreList = ref(null);
const genresExpandText = ref("");
const genresCollapsedHeight = 85;

// Render expand text prompt, invoked when collapsable section emits scrollHeight change event (Collapsable section
// always emits this event once when mounted, so there is no need to set up this text prompt manually).
const renderGenresExpandText = () => {
  genresExpandText.value = `Show ${countVerticalOverflowedChildren(
    genreList.value,
    genresCollapsedHeight
  )} more genres`;
};
</script>

<style scoped></style>
