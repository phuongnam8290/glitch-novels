<template>
  <div class="title-card grid h-[250px]">
    <div class="cover">
      <img
        src="src/assets/images/titles/covers/01.png"
        alt="Title cover"
        class="h-full w-full object-cover"
      />
    </div>
    <h1 class="title inline-block overflow-hidden">
      <a
        href="#"
        class="title-text inline-block w-full truncate"
        ref="title"
        @mouseenter="startMarquee($event, 2)"
        @mouseleave="stopMarquee"
      >
        <span>Solo Leveling 123 123 123 123 123 123 123 123</span>
      </a>
    </h1>
    <h2 class="author overflow-hidden">
      <a
        href="#"
        class="subtitle-text inline-block w-full truncate"
        ref="author"
        @mouseenter="startMarquee($event, 2)"
        @mouseleave="stopMarquee"
      >
        <span>추공 (Chugong)</span>
      </a>
    </h2>
    <div class="ratings self-center">
      <span>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-solid fa-star-sharp-half-stroke"></i>
        <i class="fa-regular fa-star-sharp"></i>
      </span>
    </div>
    <scrollable-tags
      :tags="[
        'Action',
        'Adventure',
        'Weak to Strong',
        'Game Element',
        'Accelerated Growth',
        'Gate to Another World',
        'Hiding True Abilities',
      ]"
      class="tags py-4"
    />
    <div
      class="synopsis cursor-pointer overflow-y-hidden pb-10 pr-1 hover:overflow-y-scroll"
      v-drag-scroll.y
    >
      <p>
        In this world where Hunters with various magical powers battle monsters from invading the defenceless humanity,
        Seong Jin-Woo was the weakest of all the Hunters, barely able to make a living.
      </p>
      <p>
        However, a mysterious System grants him the power of the ‘Player’, setting him on a course for an incredible and
        often times perilous Journey.
      </p>
      <p>
        Follow Sang Jin-Woo as he embarks on an adventure to become an unparalleled existence through his “Level-Up”
        system - the only one in the entire world!
      </p>
    </div>
  </div>
</template>

<script setup>
import { useStartMarquee, useStopMarquee } from "@/composable/animations/marquee";
import { dragscroll as vDragScroll } from "vue-dragscroll";

import ScrollableTags from "@/components/common/tag/ScrollableTags.vue";

const startMarquee = (event, padding) => {
  useStartMarquee(event.currentTarget, padding);
};

const stopMarquee = (event) => {
  useStopMarquee(event.currentTarget);
};
</script>

<style scoped>
.title-card {
  grid-template-columns: 180px 1fr calc(18px * 5);
  grid-template-rows: calc(1.3rem * 1.5) calc(0.8rem * 1.5) calc(0.8rem + (0.5rem * 2) + 2px + 2rem) 1fr;
  grid-template-areas:
    "cover title ratings"
    "cover author ratings"
    "cover tags tags"
    "cover synopsis synopsis";
  grid-column-gap: 1.5rem;
}

.cover {
  grid-area: cover;
}

.title {
  grid-area: title;
}

.author {
  grid-area: author;
}

.ratings {
  grid-area: ratings;
}

.tags {
  grid-area: tags;
}

.synopsis {
  grid-area: synopsis;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.1) 100%);
  scrollbar-gutter: stable;
}

.synopsis::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.synopsis::-webkit-scrollbar-track-piece {
  background-image: url("@/assets/images/scrollbar/scrollbar-track.png");
  background-repeat: repeat-y;
  background-size: contain;
}

.synopsis::-webkit-scrollbar-thumb {
  border-radius: 3px;
  border: 1px solid theme("colors[white-ink-1]");
  background-color: black;
}
</style>
