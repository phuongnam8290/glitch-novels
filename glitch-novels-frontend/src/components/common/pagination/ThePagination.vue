<template>
  <ul class="flex justify-center space-x-2">
    <li>
      <pagination-step>
        <i class="fa-sharp fa-solid fa-backward"></i>
      </pagination-step>
    </li>
    <li>
      <pagination-number :class="setActiveClass(1)"> 1 </pagination-number>
    </li>
    <li v-if="pageList[0] > 2">
      <pagination-ellipsis />
    </li>

    <li
      v-for="page in pageList"
      :key="page"
    >
      <pagination-number :class="setActiveClass(page)">{{ page }}</pagination-number>
    </li>

    <li v-if="pageList[pageList.length - 1] < pages - 1">
      <pagination-ellipsis />
    </li>
    <li v-if="!(pages === 1)">
      <pagination-number :class="setActiveClass(pages)"> {{ pages }} </pagination-number>
    </li>
    <li>
      <pagination-step>
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

const props = defineProps({
  pages: {
    type: Number,
    required: true,
    default: 15,
  },
  currentPage: {
    type: Number,
    required: false,
    default: 9,
  },

  // Number of page items in each side of current (exclude first, last, ellipsis)
  offset: {
    type: Number,
    required: false,
    default: 2,
  },
});

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
    if (page < props.pages) {
      pushPageToList(page, pageList);
    }
  }

  return pageList;
});

const pushPageToList = (page, pageList) => {
  if (page <= 1 || page >= props.pages) {
    return;
  }

  pageList.push(page);
};

const setActiveClass = (page) => ({
  active: page === props.currentPage,
});
</script>

<style scoped></style>
