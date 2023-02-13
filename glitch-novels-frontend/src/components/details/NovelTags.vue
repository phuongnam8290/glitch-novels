<template>
  <collapsable-section
    :collapsed-height="tagsCollapsedHeight"
    :expand-text="tagsExpandText"
    class="tags"
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
          v-for="tag in tags"
          :key="tag"
        >
          <the-tag> {{ tag }} </the-tag>
        </li>
      </ul>
    </template>
  </collapsable-section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { countVerticalOverflowedChildren } from "@/utils/countHiddenChildren";

import CollapsableSection from "@/components/common/CollapsableSection.vue";
import TheTag from "@/components/common/tag/TheTag.vue";

const tags = ref([
  "Accelerated Growth",
  "Adapted to Anime",
  "Adapted to Manhwa",
  "Adventurers",
  "Appearance Changes",
  "Army Building",
  "BeautifulFemale Lead",
  "Calm Protagonist",
  "Caring Protagonist",
  "Cheats",
  "Determined Protagonist",
  "Dungeons",
  "Famous Protagonist",
  "Game Elements",
  "Gate to Another World",
  "Grinding",
  "Guilds",
  "Handsome Male Lead",
  "Hard-Working Protagonist",
  "Hiding True Abilities",
  "Hunters",
  "Kuudere",
  "Late Romance",
  "Level System",
  "Loner Protagonist",
  "Loyal Subordinates",
  "Male Protagonist",
  "Misunderstandings",
  "Modern Day",
  "Multiple POV",
  "Nationalism",
  "Near-Death Experience",
  "Necromancer",
  "Overpowered Protagonist",
  "Personality Changes",
  "Romantic Subplot",
  "Time Travel",
  "Weak to Strong",
]);

const tagList = ref(null);
const tagsExpandText = ref("");
const tagsCollapsedHeight = 85;

onMounted(() => {
  tagsExpandText.value = `Show ${countVerticalOverflowedChildren(tagList.value, tagsCollapsedHeight)} more tags`;
});
</script>

<style scoped></style>
