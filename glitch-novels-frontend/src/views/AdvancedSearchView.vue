<template>
  <div>
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
      <span> Advanced Search </span>
    </h1>

    <section class="mt-8">
      <div class="advanced-search-controls flex items-center gap-5">
        <input
          class="search-input flex-grow"
          style="font-family: 'Metropolis', FontAwesome, serif"
          type="text"
          placeholder="&#xF002; Start typing to search..."
        />

        <button class="space-x-1.5 text-lg">
          <span><i class="fa-sharp fa-solid fa-filter"></i></span>
          <span>Filter</span>
        </button>

        <Teleport to="body">
          <BaseModal>
            <div class="modal-content grid p-10">
              <h1 class="modal-header section-text text-center"> Filters </h1>

              <div class="modal-body flex flex-wrap gap-x-10 gap-y-5 pr-2">
                <div
                  v-for="(filtersGroup, filtersGroupTitle) in filters"
                  :key="filtersGroupTitle"
                >
                  <h2 class="title-text">{{ formatFiltersGroupTitle(filtersGroupTitle) }}</h2>
                  <div class="filters-group mt-4 flex flex-wrap gap-x-5 gap-y-3">
                    <div
                      v-for="filter in filtersGroup"
                      :key="filter"
                      class="selectable-tag"
                    >
                      <input
                        class="hidden"
                        type="checkbox"
                        :name="`${filtersGroupTitle}-${filter}`"
                        :id="`${filtersGroupTitle}-${filter}`"
                        :value="filter"
                      />
                      <label :for="`${filtersGroupTitle}-${filter}`">
                        {{ filter }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer flex justify-end gap-x-10">
                <button
                  class="text-btn border border-gold-brand-2 bg-gold-brand-2 hover:border-gold-brand-1 hover:bg-gold-brand-1 hover:text-white-ink-1"
                >
                  <span>
                    <i class="fa-sharp fa-solid fa-filter"></i>
                  </span>
                  <span class="ml-2">Filter</span>
                </button>

                <button class="text-btn">
                  <span>
                    <i class="fa-sharp fa-light fa-xmark fa-lg"></i>
                  </span>
                  <span class="ml-2">Cancel</span>
                </button>
              </div>
            </div>
          </BaseModal>
        </Teleport>
      </div>
    </section>

    <section class="mt-8"> </section> </div
></template>

<script setup>
import BaseModal from "@/components/common/modal/BaseModal.vue";
import { reactive } from "vue";

const filters = reactive({
  demographic: ["Male", "Female"],
  publicationStatus: ["Ongoing", "Completed", "Hiatus", "Cancelled"],
  genre: [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Isekai",
    "Magical Girls",
    "Mecha",
    "Medical",
    "Mystery",
    "Philosophical",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Superhero",
    "Thriller",
    "Tragedy",
    "Wuxia",
  ],
  theme: [
    "Aliens",
    "Animals",
    "Cooking",
    "Crossdressing",
    "Delinquents",
    "Demons",
    "Genderswap",
    "Ghost",
    "Gyaru",
    "Harem",
    "Incest",
    "Loli",
    "Mafia",
    "Magic",
    "Martial Arts",
    "Military",
    "Monster Girls",
    "Monsters",
    "Music",
    "Ninja",
    "Office Workers",
    "Police",
    "Post-Apocalyptic",
    "Reincarnation",
    "Reverse Harem",
    "Samurai",
    "School Life",
    "Shota",
    "Supernatural",
    "Survival",
    "Time Travel",
    "Traditional Games",
    "Vampires",
    "Video Games",
    "Villianess",
    "Virtual Reality",
    "Zombies",
  ],
});

const formatFiltersGroupTitle = (title) =>
  title
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .reduce((title, word) => `${title} ${word}`);
</script>

<style scoped>
input[type="text"] {
  @apply bg-gray-bg-1/80;
}

input[type="text"]::placeholder {
  @apply text-white-ink-1;
}

.modal-content {
  max-height: 80vh;
  min-width: 500px;
  max-width: 90vw;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  row-gap: 2.5rem;
}

.modal-body {
  @apply custom-scrollbar overflow-y-auto;
  scrollbar-gutter: auto;
}

.selectable-tag {
  transition: 0.25s all;
  @apply border border-white-ink-1 px-5 py-2 hover:border-gold-brand-1 hover:text-gold-brand-1;
}

button {
  /* use width instead of flex-basis on flex-items to fix container mot expanding width to fit flexbox content. */
  min-width: 180px;
}
</style>
