<template>
  <div class="relative">
    <div
      class="left-arrow absolute top-0 left-0 z-50 flex hidden h-full cursor-pointer items-center hover:text-gold-brand-1"
      ref="leftArrow"
      @click="scroll('left')"
    >
      <span>
        <i class="fa-sharp fa-solid fa-chevrons-left"></i>
      </span>
    </div>

    <div
      class="tag-list flex space-x-4 overflow-x-scroll"
      ref="tagList"
    >
      <the-tag
        class="tag"
        v-for="(tag, index) in tags"
        :key="tag"
        :class="{ start: index === 0, end: index === tags.length - 1 }"
      >
        {{ tag }}
      </the-tag>
    </div>

    <div
      class="right-arrow absolute top-0 right-0 z-50 flex hidden h-full cursor-pointer items-center hover:text-gold-brand-1"
      ref="rightArrow"
      @click="scroll('right')"
    >
      <span>
        <i class="fa-sharp fa-solid fa-chevrons-right"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

import TheTag from "@/components/common/tag/TheTag.vue";

defineProps({
  tags: {
    type: Array,
    required: true,
  },
});

// Show & hide arrow icons when appropriate.
const leftArrow = ref(null);
const rightArrow = ref(null);
const tagList = ref(null);

const toggleArrowIcons = (entries) => {
  for (let entry of entries) {
    let tag = entry.target;

    // The left arrow icon appears when the first tag shows less than the threshold and is hidden if vice-versa.
    if (tag.classList.contains("start") && entry.isIntersecting) {
      leftArrow.value.classList.add("hidden");
      tagList.value.classList.remove("left-transparent");
    }
    if (tag.classList.contains("start") && !entry.isIntersecting) {
      leftArrow.value.classList.remove("hidden");
      tagList.value.classList.add("left-transparent");
    }

    // The right arrow icon appears when the last tag shows less than the threshold and is hidden if vice-versa.
    if (tag.classList.contains("end") && entry.isIntersecting) {
      rightArrow.value.classList.add("hidden");
      tagList.value.classList.remove("right-transparent");
    }
    if (tag.classList.contains("end") && !entry.isIntersecting) {
      rightArrow.value.classList.remove("hidden");
      tagList.value.classList.add("right-transparent");
    }
  }
};

// Create an intersection observer on mounted, then remove it on unmounted.
let intersectionObserver = null;
onMounted(() => {
  let options = {
    root: tagList.value,
    threshold: 0.95,
  };

  intersectionObserver = new IntersectionObserver(toggleArrowIcons, options);
  intersectionObserver.observe(tagList.value.querySelector(".start"));
  intersectionObserver.observe(tagList.value.querySelector(".end"));
});

onBeforeUnmount(() => {
  intersectionObserver.unobserve(tagList.value.querySelector(".start"));
  intersectionObserver.unobserve(tagList.value.querySelector(".end"));
});

// Scroll when clicking the arrow icons.
const scroll = (direction) => {
  let scrollPosition = tagList.value.scrollLeft;

  // Scroll half the container width each time.
  let scrollWidth = tagList.value.offsetWidth / 2;

  if (direction === "left") {
    tagList.value.scrollTo({
      top: 0,
      left: scrollPosition - scrollWidth,
      behavior: "smooth",
    });
  } else if (direction === "right") {
    tagList.value.scrollTo({
      top: 0,
      left: scrollPosition + scrollWidth,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.left-arrow,
.right-arrow {
  transition: color 0.5s ease-in;
}

.tag-list::-webkit-scrollbar {
  display: none;
}

/* For tags left & right scroll indicators */
.left-transparent {
  mask-image: linear-gradient(to left, black 80%, transparent 90%);
}

.right-transparent {
  mask-image: linear-gradient(to right, black 80%, transparent 90%);
}

.left-transparent.right-transparent {
  mask-image: linear-gradient(0.25turn, transparent 10%, black 20%, black 80%, transparent 90%);
}
</style>
