<template>
  <div
    class="details mt-16 flex items-start gap-x-6"
    v-if="NOVEL_DETAILS"
  >
    <div class="left-col sticky top-36 flex flex-col bg-gray-bg-1/80">
      <div class="cover px-3 pt-3">
        <img
          :src="NOVEL_DETAILS.coverUrl"
          alt="Cover"
          class="h-full object-cover"
        />
      </div>
      <div class="flex justify-center py-6">
        <publish-info
          :createdDate="NOVEL_DETAILS.createdDate"
          :lastUpdatedDate="NOVEL_DETAILS.lastUpdatedDate"
          :numberOfChapters="NOVEL_DETAILS.numberOfChapters"
        />
      </div>
    </div>

    <div class="right-col grid w-full gap-y-6">
      <div>
        <h1 class="title size font-bold"> {{ NOVEL_DETAILS.title }} </h1>
        <a href="#"> {{ NOVEL_DETAILS.author.name }} </a>
      </div>

      <novel-synopsis
        class="synopsis"
        :synopsis="NOVEL_DETAILS.synopsis"
      />
      <novel-genres
        class="genres"
        :genres="NOVEL_DETAILS.genres"
        v-if="NOVEL_DETAILS.genres.length !== 0"
      />
      <novel-tags
        class="tags"
        :tags="NOVEL_DETAILS.tags"
        v-if="NOVEL_DETAILS.tags.length !== 0"
      />
      <section>
        <h2 class="section-text table-of-contents bg-gray-bg-1/80 p-4">Table of Contents</h2>
        <chapter-list :chapters="CURRENT_CHAPTERS" />
        <div class="bg-gray-bg-1/80 pb-4 pt-8">
          <the-pagination
            :total-pages="TOTAL_PAGES"
            :current-page="CURRENT_PAGE"
            @changePage="changePage"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useDetailsStore } from "@/stores/details";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import PublishInfo from "@/components/details/PublishInfo.vue";
import NovelSynopsis from "@/components/details/NovelSynopsis.vue";
import NovelGenres from "@/components/details/NovelGenres.vue";
import NovelTags from "@/components/details/NovelTags.vue";
import ChapterList from "@/components/details/ChapterList.vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";

const detailsStore = useDetailsStore();
const route = useRoute();

onMounted(() => detailsStore.FETCH_DETAIL(route.params.id));

const NOVEL_DETAILS = computed(() => detailsStore.NOVEL_DETAILS);
const CURRENT_CHAPTERS = computed(() => detailsStore.CURRENT_CHAPTERS);
const TOTAL_PAGES = computed(() => detailsStore.TOTAL_PAGES);
const CURRENT_PAGE = computed(() => detailsStore.CURRENT_PAGE);

// Handle paginate action.
const changePage = (page) => {
  detailsStore.CHANGE_PAGE(page);

  // Scroll to top after load new batch of chapters.
  window.scrollTo({
    top: 95,
    behavior: "smooth",
  });
};
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
