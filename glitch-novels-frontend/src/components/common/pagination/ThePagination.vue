<template>
  <ul class="flex justify-center space-x-2">
    <li v-if="currentPage !== 1">
      <pagination-step @click="changePage(currentPage - 1)">
        <i class="fa-sharp fa-solid fa-backward"></i>
      </pagination-step>
    </li>
    <li>
      <pagination-number
        :class="setActiveClass(1)"
        @click="changePage(1)"
      >
        1
      </pagination-number>
    </li>
    <li v-if="pageList[0] > 2">
      <pagination-ellipsis @change-page="(page) => changePage(page)" />
    </li>

    <li
      v-for="page in pageList"
      :key="page"
    >
      <pagination-number
        :class="setActiveClass(page)"
        @click="changePage(page)"
      >
        {{ page }}
      </pagination-number>
    </li>

    <li v-if="pageList[pageList.length - 1] < totalPages - 1">
      <pagination-ellipsis @change-page="(page) => changePage(page)" />
    </li>
    <li v-if="!(totalPages === 1)">
      <pagination-number
        :class="setActiveClass(totalPages)"
        @click="changePage(totalPages)"
      >
        {{ totalPages }}
      </pagination-number>
    </li>
    <li v-if="currentPage !== totalPages">
      <pagination-step @click="changePage(currentPage + 1)">
        <i class="fa-sharp fa-solid fa-forward"></i>
      </pagination-step>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";

import PaginationNumber from "@/components/common/pagination/PaginationNumber.vue";
import PaginationEllipsis from "@/components/common/pagination/PaginationEllipsis.vue";
import PaginationStep from "@/components/common/pagination/PaginationStep.vue";
import { useEditModeStore } from "@/stores/editMode";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },

  // Number of page items in each side of current (exclude first, last, ellipsis)
  offset: {
    type: Number,
    required: false,
    default: 1,
  },
});

const emit = defineEmits(["changePage"]);
const editModeStore = useEditModeStore();
const IS_EDIT_MODE_ON = computed(() => editModeStore.IS_EDIT_MODE_ON);

// Clear the select list before changing page.
const changePage = (page) => {
  if (IS_EDIT_MODE_ON.value) {
    editModeStore.CLEAR_SELECTED_DATA();
  }

  emit("changePage", page);
};

const pageList = computed(() => {
  const pageList = [];
  for (let i = props.offset; i > 0; i--) {
    const page = props.currentPage - i;
    if (page > 1) {
      pushPageToList(page, pageList);
    }
  }

  pushPageToList(props.currentPage, pageList);

  for (let i = 1; i <= props.offset; i++) {
    const page = props.currentPage + i;
    if (page < props.totalPages) {
      pushPageToList(page, pageList);
    }
  }

  return pageList;
});

const pushPageToList = (page, pageList) => {
  if (page <= 1 || page >= props.totalPages) {
    return;
  }

  pageList.push(page);
};

const setActiveClass = (page) => ({
  active: page === props.currentPage,
});
</script>

<style scoped></style>
