<template>
  <collapsable-section
    :collapsed-height="tagsCollapsedHeight"
    :expand-text="tagsExpandText"
    @change-scroll-height="renderTagsExpandText"
  >
    <template #title>
      <h2 class="section-text"> Tags </h2>
    </template>

    <template #content>
      <ul
        class="flex flex-wrap gap-4"
        ref="tagList"
      >
        <li
          v-for="tag in props.tags"
          :key="tag.id"
        >
          <the-tag> {{ tag.title }} </the-tag>
        </li>
      </ul>
    </template>
  </collapsable-section>
</template>

<script setup>
import { ref } from "vue";
import { countVerticalOverflowedChildren } from "@/utils/countHiddenChildren";

import CollapsableSection from "@/components/common/CollapsableSection.vue";
import TheTag from "@/components/common/tag/TheTag.vue";
import { array, object, number, string } from "yup";

const props = defineProps({
  tags: {
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

const tagList = ref(null);
const tagsExpandText = ref("");
const tagsCollapsedHeight = 85;

// Render expand text prompt, invoked when collapsable section emits scrollHeight change event (Collapsable section
// always emits this event once when mounted, so there is no need to set up this text prompt manually).
const renderTagsExpandText = () => {
  tagsExpandText.value = `Show ${countVerticalOverflowedChildren(tagList.value, tagsCollapsedHeight)} more tags`;
};
</script>

<style scoped></style>
