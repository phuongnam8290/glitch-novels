<template>
  <div class="publish-info grid gap-x-8 gap-y-2">
    <span class="font-bold">Publish date</span>
    <span> {{ displayDate(createdDate) }} </span>

    <span class="font-bold">Last update</span>
    <span> {{ displayDate(lastUpdatedDate) }} </span>

    <span class="font-bold">Chapters</span>
    <span> {{ numberOfChapters }}</span>

    <span class="font-bold">Status</span>
    <span>Ongoing</span>

    <span class="font-bold">View</span>
    <span>108.854</span>
  </div>
</template>

<script setup>
import moment from "moment";
import { computed } from "vue";

const props = defineProps({
  createdDate: {
    type: String,
    required: true,
  },
  lastUpdatedDate: {
    type: String,
    required: true,
  },
  numberOfChapters: {
    type: Number,
    required: true,
  },
});

const createdDate = computed(() => moment(props.createdDate));
const lastUpdatedDate = computed(() => moment(props.lastUpdatedDate));

const displayDate = (date) => {
  console.log(moment().diff(date, "days"));
  if (moment().diff(date, "days") <= 6) {
    return date.fromNow();
  }

  return date.format("MMM D, YYYY");
};
</script>

<style scoped>
.publish-info {
  grid-template-columns: repeat(2, max-content);
}
</style>
