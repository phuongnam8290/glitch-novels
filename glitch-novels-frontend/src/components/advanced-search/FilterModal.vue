<template>
  <Teleport to="body">
    <BaseModal>
      <div class="modal-content grid p-10">
        <h1 class="modal-header section-text text-center"> Filters </h1>

        <div class="modal-body flex flex-wrap gap-x-10 gap-y-5 pr-2">
          <div class="search-author-wrapper">
            <h2 class="title-text">Author</h2>
            <input
              type="text"
              class="search-author-input mt-4"
              style="font-family: 'Metropolis', FontAwesome, serif"
              placeholder="&#xF007; Author"
              ref="searchAuthorInput"
            />
          </div>

          <div
            v-for="(filtersGroup, filtersGroupTitle) in filters"
            :key="filtersGroupTitle"
            :class="`search-${filtersGroupTitle}-wrapper`"
          >
            <h2 class="title-text">{{ formatFiltersGroupTitle(filtersGroupTitle) }}</h2>
            <div class="filters-group mt-4 flex flex-wrap gap-x-5 gap-y-3">
              <button
                class="select-all-btn"
                :class="{
                  selected: selectedFilters[filtersGroupTitle]?.length === 0,
                }"
                @click="selectedFilters[filtersGroupTitle] = []"
              >
                All
              </button>

              <div
                v-for="filter in filtersGroup"
                :key="filter"
                class="selectable-tag"
              >
                <input
                  type="checkbox"
                  v-model="selectedFilters[filtersGroupTitle]"
                  :name="`${filtersGroupTitle}`"
                  :id="`${filtersGroupTitle}-${filter.title.toLowerCase()}`"
                  :value="filter.title.toLowerCase()"
                />
                <label :for="`${filtersGroupTitle}-${filter.title.toLowerCase()}`">
                  {{ filter.title }}
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

          <button
            class="text-btn"
            @click="$emit('closeModal')"
          >
            <span>
              <i class="fa-sharp fa-light fa-xmark fa-lg"></i>
            </span>
            <span class="ml-2">Cancel</span>
          </button>
        </div>
      </div>
    </BaseModal>
  </Teleport>
</template>

<script setup>
import BaseModal from "@/components/common/modal/BaseModal.vue";

import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch";
import { getSearchFilters } from "@/api/search";
import { storeToRefs } from "pinia";

defineEmits(["closeModal"]);

const filters = reactive({});
const selectedFilters = reactive({});

const formatFiltersGroupTitle = (title) =>
  title
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .reduce((title, word) => `${title} ${word}`);

watch(selectedFilters, (newValue) => {
  for (const key in newValue) {
    // If all filters in a filter group are selected, then empty that group in selectedFilters.
    if (newValue[key].length === filters[key].length) {
      newValue[key] = [];
    }
  }
});

const searchAuthorInput = ref(null);
const advancedSearchStore = useAdvancedSearchStore();
const { SEARCH_CRITERIA } = storeToRefs(advancedSearchStore);

onMounted(async () => {
  searchAuthorInput.value.value = SEARCH_CRITERIA.value.author;

  const response = await getSearchFilters();

  // Using the Object.assign method to assign all properties from the response to the filters object.
  Object.assign(filters, response.data);

  // Populate the selectedFilters object with values obtained from searchCriteria or an empty array if the corresponding
  // property in searchCriteria does not exist (in case of the first time open the modal / select all filters in one
  // group). It is necessary when grouping selected filters in the same group using v-model.
  for (const key in filters) {
    selectedFilters[key] = SEARCH_CRITERIA.value[key] ?? [];
  }
});

// Update searchCriteria when closing the filter modal.
onBeforeUnmount(() => {
  for (const key in selectedFilters) {
    SEARCH_CRITERIA.value.author = searchAuthorInput.value.value;
    SEARCH_CRITERIA.value[key] = selectedFilters[key];
  }
});
</script>

<style scoped>
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

.search-author-wrapper {
  flex: 0 1 400px;
}

.search-author-input {
  padding: 0.25rem 1rem;
  width: 100%;
}

/* Styles for publication status filters block, using class name generated through v-for.*/
.search-publicationStatus-wrapper {
  flex: 1 1 550px;
}

.selectable-tag input[type="checkbox"] {
  display: none;
}

.selectable-tag label,
.select-all-btn {
  transition: 0.25s all;
  @apply inline-block border border-white-ink-1 px-4 py-1 hover:border-gold-brand-1 hover:text-gold-brand-1;
}

.selectable-tag > input[type="checkbox"]:checked ~ label,
.select-all-btn.selected {
  @apply border-gold-brand-2 bg-gold-brand-2;
}

.selectable-tag > input[type="checkbox"]:checked ~ label:hover,
.select-all-btn.selected:hover {
  @apply text-white-ink-1;
}

.modal-footer button {
  /* use width instead of flex-basis on flex-items to fix container mot expanding width to fit flexbox content. */
  min-width: 180px;
}
</style>
