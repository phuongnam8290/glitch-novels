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
      <div class="synopsis space-y-4 bg-gray-bg-1/80 p-4">
        <h2 class="title-text">Synopsis</h2>
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
      </div>

      <collapsable-section
        :collapsed-height="genresCollapsedHeight"
        :expand-text="genresExpandText"
        class="genres"
      >
        <template #title>
          <h2 class="title-text"> Genres </h2>
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
          <h2 class="title-text"> Tags </h2>
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
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import CollapsableSection from "@/components/common/CollapsableSection.vue";
import TheTag from "@/components/common/tag/TheTag.vue";

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

const tagList = ref(null);
const tagsExpandText = ref("");
const tagsCollapsedHeight = 85;

const genreList = ref(null);
const genresExpandText = ref("");
const genresCollapsedHeight = 85;

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
</script>

<style scoped>
.right-col {
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr max-content max-content;
  grid-template-areas:
    "title"
    "synopsis"
    "genres"
    "tags";
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
  font-size: 1.8rem;
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
</style>
