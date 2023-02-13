<template>
  <div class="details mt-16 flex items-start gap-x-6">
    <div class="left-col sticky top-36 flex flex-col bg-gray-bg-1/80">
      <div class="cover px-3 pt-3">
        <img
          src="https://res.cloudinary.com/dy9vrfexa/image/upload/v1675824419/glitch-novels/covers/01_t3nmts.jpg"
          alt="Cover"
          class="h-full object-cover"
        />
      </div>
      <div class="flex justify-center py-6">
        <publish-info />
      </div>
    </div>

    <div class="right-col grid gap-y-6">
      <div>
        <h1 class="title size font-bold"> The Lady and the Beast </h1>
        <a href="#"> Chugong </a>
      </div>

      <novel-synopsis class="synopsis" />
      <novel-genres class="genres" />
      <novel-tags class="tags" />
      <novel-chapter-list class="table-of-contents" />
    </div>
  </div>
</template>

<script setup>
import PublishInfo from "@/components/details/PublishInfo.vue";
import NovelSynopsis from "@/components/details/NovelSynopsis.vue";
import NovelGenres from "@/components/details/NovelGenres.vue";
import NovelTags from "@/components/details/NovelTags.vue";
import NovelChapterList from "@/components/details/NovelChapterList.vue";
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
