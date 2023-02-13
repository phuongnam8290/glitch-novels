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
      <div class="info grid justify-center gap-x-8 gap-y-2 py-6">
        <span class="font-bold">Publish date</span>
        <span>Nov 14, 2018</span>

        <span class="font-bold">Last update</span>
        <span>Feb 12, 2023</span>

        <span class="font-bold">Chapters</span>
        <span>1450</span>

        <span class="font-bold">Status</span>
        <span>Ongoing</span>

        <span class="font-bold">View</span>
        <span>108.854</span>
      </div>
    </div>

    <div class="right-col grid gap-y-6">
      <div>
        <h1 class="title size font-bold"> The Lady and the Beast </h1>
        <a href="#"> Chugong </a>
      </div>
      <section class="synopsis space-y-4 bg-gray-bg-1/80 p-4">
        <h2 class="section-text">Synopsis</h2>
        <div class="flex items-start gap-x-10">
          <article>
            <p>
              10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the
              ordinary, everyday people received the power to hunt monsters within the Gate. They are known as
              “Hunters”.
            </p>
            <p>
              However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to
              risk his life in the lowliest of catacombs, the “World’s Weakest”.
            </p>
            <p>
              Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled
              catacombs… at least until I found a hidden catacomb with the hardest difficulty within the D-rank
              catacombs!
            </p>
            <p>
              In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could
              see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted
              monsters, my level would rise.
            </p>
            <p> Changing from the weakest Hunter to the strongest S-rank Hunter! </p>
          </article>

          <aside class="details-ratings sticky top-[123px] grid gap-x-8 gap-y-2 border-l-4 border-gold-brand-1 pl-10">
            <span>Stability of Updates</span>
            <span class="ratings">
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-solid fa-star-sharp-half-stroke"></i>
              <i class="fa-regular fa-star-sharp"></i>
            </span>

            <span>Story Development</span>
            <span class="ratings">
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-solid fa-star-sharp-half-stroke"></i>
              <i class="fa-regular fa-star-sharp"></i>
            </span>

            <span>Character Design</span>
            <span class="ratings">
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-solid fa-star-sharp-half-stroke"></i>
              <i class="fa-regular fa-star-sharp"></i>
            </span>

            <span>World Background</span>
            <span class="ratings">
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-solid fa-star-sharp-half-stroke"></i>
              <i class="fa-regular fa-star-sharp"></i>
            </span>
          </aside>
        </div>
      </section>

      <collapsable-section
        :collapsed-height="genresCollapsedHeight"
        :expand-text="genresExpandText"
        class="genres"
      >
        <template #title>
          <h2 class="section-text"> Genres </h2>
        </template>

        <template #content>
          <ul
            class="flex flex-wrap gap-4"
            ref="genreList"
          >
            <li
              v-for="genre in genres"
              :key="genre"
            >
              <the-tag> {{ genre }} </the-tag>
            </li>
          </ul>
        </template>
      </collapsable-section>

      <collapsable-section
        :collapsed-height="tagsCollapsedHeight"
        :expand-text="tagsExpandText"
        class="tags"
      >
        <template #title>
          <h2 class="section-text"> Tags </h2>
        </template>

        <template #content>
          <ul
            class="flex flex-wrap gap-4"
            ref="tagList"
          >
            <li
              v-for="tag in tags"
              :key="tag"
            >
              <the-tag> {{ tag }} </the-tag>
            </li>
          </ul>
        </template>
      </collapsable-section>

      <section class="table-of-contents">
        <h2 class="section-text bg-gray-bg-1/80 p-4">Table of Contents</h2>
        <ul class="chapter-list grid grid-cols-2">
          <li
            v-for="(chapter, index) in chapters"
            :key="chapter['chapter-number']"
            class="border-y border-gray-bg-2"
            :class="setChapterBg(index)"
          >
            <a
              href="#"
              class="chapter grid gap-y-2 py-3 hover:bg-gray-selected-bg"
            >
              <div
                class="chapter-number flex items-center justify-center"
                :class="setChapterBorder(index)"
              >
                <span> {{ chapter["chapter-number"] }}</span>
              </div>
              <div class="chapter-name">
                <span>{{ chapter["chapter-name"] }}</span>
              </div>
              <div class="chapter-release-date subtitle-text">
                <span>9 mth</span>
              </div>
            </a>
          </li>

          <li
            v-if="chapters.length % 2 !== 0"
            :class="setChapterBg(chapters.length)"
            class="border-y border-gray-bg-2"
          >
          </li>
        </ul>
        <div class="bg-gray-bg-1/80 pb-4 pt-8">
          <the-pagination
            :current-page="5"
            :total-pages="10"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import CollapsableSection from "@/components/common/CollapsableSection.vue";
import TheTag from "@/components/common/tag/TheTag.vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";

const genres = ref(["Action", "Adventure", "Drama", "Fantasy", "Mystery", "Shounen", "Supernatural"]);
const tags = ref([
  "Accelerated Growth",
  "Adapted to Anime",
  "Adapted to Manhwa",
  "Adventurers",
  "Appearance Changes",
  "Army Building",
  "BeautifulFemale Lead",
  "Calm Protagonist",
  "Caring Protagonist",
  "Cheats",
  "Determined Protagonist",
  "Dungeons",
  "Famous Protagonist",
  "Game Elements",
  "Gate to Another World",
  "Grinding",
  "Guilds",
  "Handsome Male Lead",
  "Hard-Working Protagonist",
  "Hiding True Abilities",
  "Hunters",
  "Kuudere",
  "Late Romance",
  "Level System",
  "Loner Protagonist",
  "Loyal Subordinates",
  "Male Protagonist",
  "Misunderstandings",
  "Modern Day",
  "Multiple POV",
  "Nationalism",
  "Near-Death Experience",
  "Necromancer",
  "Overpowered Protagonist",
  "Personality Changes",
  "Romantic Subplot",
  "Time Travel",
  "Weak to Strong",
]);
const chapters = ref([
  { "chapter-number": 1, "chapter-name": "A Strange Circumstance" },
  { "chapter-number": 2, "chapter-name": "Alexander Romanoff" },
  { "chapter-number": 3, "chapter-name": "Realization" },
  { "chapter-number": 4, "chapter-name": "I Will Save You" },
  { "chapter-number": 5, "chapter-name": "First Day?" },
  { "chapter-number": 6, "chapter-name": "First Decisions" },
  { "chapter-number": 7, "chapter-name": "Working Hard" },
  { "chapter-number": 8, "chapter-name": "Things About to Get Serious" },
  { "chapter-number": 9, "chapter-name": "The Romanoff's Decision" },
  { "chapter-number": 10, "chapter-name": "The First Day of August" },
  { "chapter-number": 11, "chapter-name": "What the Ruthenian People Needs" },
  { "chapter-number": 12, "chapter-name": "Acceptance" },
  { "chapter-number": 13, "chapter-name": "The Hope" },
  { "chapter-number": 14, "chapter-name": "I Guess it's a Success" },
  { "chapter-number": 15, "chapter-name": "The Cure" },
  { "chapter-number": 16, "chapter-name": "Progress" },
  { "chapter-number": 17, "chapter-name": "Siblings" },
  { "chapter-number": 18, "chapter-name": "New Personnel" },
  { "chapter-number": 19, "chapter-name": "Learning about the People Part 1" },
]);

const genreList = ref(null);
const genresExpandText = ref("");
const genresCollapsedHeight = 85;

const tagList = ref(null);
const tagsExpandText = ref("");
const tagsCollapsedHeight = 85;

onMounted(() => {
  genresExpandText.value = `Show ${countHiddenChildren(genreList.value, tagsCollapsedHeight)} more genres`;
  tagsExpandText.value = `Show ${countHiddenChildren(tagList.value, tagsCollapsedHeight)} more tags`;
});

// Count the number of overflowed children. collapsedHeight is the height of the container that applied overflow-hidden.
const countHiddenChildren = (parent, collapsedHeight = parent.clientHeight) => {
  if (!parent) {
    return;
  }

  const children = [...parent.children];
  let hiddenChildren = 0;

  children.forEach((child) => {
    // If the child is vertically overflowed, then the top position of it will be lower than the container's bottom
    // position, which signifies by the collapsedHeight attribute.
    child.offsetTop >= collapsedHeight ? hiddenChildren++ : null;
  });

  return hiddenChildren;
};

const getRenderedChapterPosition = (chapterIndex) => {
  const row = Math.floor(chapterIndex / 2) + 1;

  return {
    isOddRow: row % 2 !== 0,
    isInRightColumn: chapterIndex % 2 !== 0,
  };
};

const setChapterBg = (chapterIndex) => {
  const renderedChapterPosition = getRenderedChapterPosition(chapterIndex);
  const isOddRow = renderedChapterPosition.isOddRow;

  return {
    "bg-gray-bg-1/80": !isOddRow,
    "bg-gray-bg-2/80": isOddRow,
  };
};

const setChapterBorder = (chapterIndex) => {
  const renderedChapterPosition = getRenderedChapterPosition(chapterIndex);
  const isOddRow = renderedChapterPosition.isOddRow;
  const isInRightColumn = renderedChapterPosition.isInRightColumn;

  return {
    "border-l": isInRightColumn,
    "border-gray-bg-1": isInRightColumn && isOddRow,
    "border-gray-bg-2": isInRightColumn && !isOddRow,
  };
};
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

.info {
  grid-template-columns: repeat(2, max-content);
}

.title {
  grid-area: title;
  font-size: 2rem;
}

.synopsis {
  grid-area: synopsis;
}

.details-ratings {
  grid-template-columns: repeat(2, max-content);
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

.chapter {
  grid-template-columns: calc(4ch + 2rem) 1fr;
  grid-template-rows: calc(1rem * 1.3) calc(0.8rem * 1.3);
  grid-template-areas:
    "chapter-number chapter-name"
    "chapter-number chapter-release-date";
}

.chapter-number {
  grid-area: chapter-number;
  font-size: 1.3rem;
}

.chapter-name {
  grid-area: chapter-name;
}

.chapter-release-date {
  grid-area: chapter-release-date;
}
</style>
