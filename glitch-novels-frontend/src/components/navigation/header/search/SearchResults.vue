<template>
  <div class="search-results custom-scrollbar max-h-[75vh] overflow-auto">
    <section v-if="searchResults.novels.length > 0">
      <header class="section-text m-2 mr-4 flex items-center justify-between">
        <span>Novels</span>
        <a href="#">
          <i class="fa-regular fa-light fa-arrow-right"></i>
        </a>
      </header>
      <ul class="search-results-novel">
        <SearchResultNovel
          :novel="novel"
          v-for="novel in searchResults.novels"
          :key="novel.id"
        />
      </ul>
    </section>

    <section v-if="searchResults.authors.length > 0">
      <header class="section-text m-2 mr-4 flex items-center justify-between">
        <span>Authors</span>
        <a href="#">
          <i class="fa-regular fa-light fa-arrow-right"></i>
        </a>
      </header>
      <ul class="search-results-author">
        <SearchResultAuthor
          :author="author"
          v-for="author in searchResults.authors"
          :key="author.id"
        />
      </ul>
    </section>
  </div>
</template>

<script setup>
import { array, number, object, string } from "yup";

import SearchResultNovel from "@/components/navigation/header/search/SearchResultNovel.vue";
import SearchResultAuthor from "@/components/navigation/header/search/SearchResultAuthor.vue";
import { computed } from "vue";

const props = defineProps({
  searchResults: {
    type: Object,
    required: true,
    validator(value) {
      const schema = object({
        novels: array().of(
          object({
            id: number().required().positive(),
            title: string().required(),
            coverUrl: string().required().url(),
            author: object({
              id: number().required(),
              name: string().required(),
            }),
            genres: array().of(
              object({
                id: number().required(),
                title: string().required(),
              })
            ),
          })
        ),
        authors: array().of(
          object({
            id: number().required().positive(),
            name: string().required(),
            novels: array().of(
              object({
                id: number().required().positive(),
                title: string().required(),
              })
            ),
          })
        ),
      });

      // Validate the search result's structure against the schema. Print validate errors, if any.
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

const searchResults = computed(() => props.searchResults);
</script>

<style scoped>
.search-results {
  scrollbar-gutter: auto;
  overscroll-behavior: contain;
}
</style>
