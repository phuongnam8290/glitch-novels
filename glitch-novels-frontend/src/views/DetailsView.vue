<template>
  <div
    class="details mt-16 flex items-start gap-x-6"
    v-if="novel"
  >
    <div class="left-col sticky top-36 flex flex-col bg-gray-bg-1/80">
      <div class="cover px-3 pt-3">
        <img
          :src="novel.coverUrl"
          alt="Cover"
          class="h-full object-cover"
        />
      </div>
      <div class="flex justify-center py-6">
        <publish-info
          :createdDate="novel.createdDate"
          :lastUpdatedDate="novel.lastUpdatedDate"
          :numberOfChapters="novel.chapters.length"
        />
      </div>
    </div>

    <div class="right-col grid w-full gap-y-6">
      <div>
        <h1 class="title size font-bold"> {{ novel.title }} </h1>
        <a href="#"> {{ novel.author.name }} </a>
      </div>

      <novel-synopsis
        class="synopsis"
        :synopsis="novel.description"
      />
      <novel-genres
        class="genres"
        :genres="novel.genres"
        v-if="novel.genres.length !== 0"
      />
      <novel-tags
        class="tags"
        :tags="novel.tags"
        v-if="novel.tags.length !== 0"
      />
      <novel-chapter-list
        class="table-of-contents"
        :chapters="CURRENT_CHAPTERS"
      />
    </div>
  </div>
</template>

<script setup>
import { useDetailsStore } from "@/stores/details";
import { useRoute } from "vue-router";

import PublishInfo from "@/components/details/PublishInfo.vue";
import NovelSynopsis from "@/components/details/NovelSynopsis.vue";
import NovelGenres from "@/components/details/NovelGenres.vue";
import NovelTags from "@/components/details/NovelTags.vue";
import NovelChapterList from "@/components/details/NovelChapterList.vue";
import { computed, onMounted } from "vue";

const detailsStore = useDetailsStore();
const route = useRoute();

onMounted(() => detailsStore.FETCH_DETAIL(route.params.id));

const novel = computed(() => detailsStore.NOVEL_DETAILS);
const CURRENT_CHAPTERS = computed(() => detailsStore.CURRENT_CHAPTERS);
</script>

<style scoped>
.right-col {
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr max-content max-content;
  grid-template-areas:
    "title"
    "synopsis"
    "genres"
    "tags"
    "table-of-contents";
}

.cover {
  width: calc(300px + 16px * 1.5);
  height: calc(450px + 16px * 0.75);
}

.title {
  grid-area: title;
  font-size: 2rem;
}

.synopsis {
  grid-area: synopsis;
}

.genres {
  grid-area: genres;
}

.tags {
  grid-area: tags;
}

.table-of-contents {
  grid-area: table-of-contents;
}
</style>
