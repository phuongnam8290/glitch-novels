<template>
  <div
    class="container relative mx-auto -mb-20 bg-gray-bg-1"
    ref="test"
    @wheel="handleMouseWheel"
  >
    <div
      class="h-[100px] bg-green-700"
      v-for="n in prevChapters"
      :key="n"
    >
      {{ n }}
    </div>
    <div class="h-[100px] bg-amber-400"> </div>
    <div
      class="h-[100px] bg-blue-700"
      v-for="n in nextChapters"
      :key="n"
    >
      {{ n }}
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";

const test = ref(null);
const prevChapters = ref([]);
const nextChapters = ref([]);

onMounted(async () => {
  while (test.value.getBoundingClientRect().bottom < window.innerHeight) {
    await renderNextChapters();
  }

  document.documentElement.addEventListener("wheel", handleMouseWheel);
});

onUnmounted(() => {
  document.documentElement.removeEventListener("wheel", handleMouseWheel);
});

const handleMouseWheel = async (event) => {
  if (event.deltaY > 0) {
    while (test.value.getBoundingClientRect().bottom < window.innerHeight) {
      await renderNextChapters();
    }
  } else {
    if (test.value.getBoundingClientRect().top > 0) {
      await renderPrevChapters();
    }
  }
};

const renderPrevChapters = async () => {
  prevChapters.value.unshift(-(prevChapters.value.length + 1));
  await nextTick();
};

const renderNextChapters = async () => {
  nextChapters.value.push(nextChapters.value.length + 1);
  await nextTick();
};
</script>

<style scoped></style>
