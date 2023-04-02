<template>
  <nav class="sidebar-contents-wrapper overflow-hidden bg-gray-bg-2">
    <div class="sidebar-contents py-5 px-10">
      <!--  Logo  -->
      <img
        class="logo h-9"
        src="@/assets/images/common/logo.png"
        alt="Glitch logo"
      />
      <!--  End of logo  -->

      <!--  Navigation links  -->
      <div class="title-text mt-8 space-y-3 whitespace-nowrap text-white-ink-1">
        <div
          v-for="linkGroup in navigationLinkGroups"
          :key="linkGroup.linkGroupHeader"
        >
          <div
            class="link-group-header"
            :class="{ active: linkGroup.isActive }"
          >
            <router-link
              :to="{ name: linkGroup.routeName }"
              href="#"
              class="py-1 px-2"
            >
              <span class="icon mr-2">
                <i
                  class="fa-sharp fa-solid"
                  :class="linkGroup.icon"
                />
              </span>
              {{ linkGroup.linkGroupHeader }}
            </router-link>
          </div>
          <ul class="font-normal">
            <li
              class="link-group-item py-1 pl-6"
              :class="{ active: link.isActive }"
              v-for="link in linkGroup.linkGroupItems"
              :key="link"
            >
              <a href="#">{{ link.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!--  End of navigation links  -->
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const navigationLinkGroups = ref([
  {
    linkGroupHeader: "Home",
    icon: "fa-house",
    routeName: "home",
    linkGroupItems: [],
  },
  {
    linkGroupHeader: "Novels",
    icon: "fa-book-open-cover",
    routeName: "novels",
    linkGroupItems: [
      { title: "Advanced Search", isActive: true },
      { title: "Recently Added" },
      { title: "Latest Updates" },
      { title: "Random" },
    ],
  },
  {
    linkGroupHeader: "Glitch Novels",
    icon: "fa-thumbtack",
    routeName: "home",
    linkGroupItems: [
      { title: "About Us" },
      { title: "Site Rules" },
      { title: "Privacy Policy" },
      { title: "Announcemnets" },
    ],
  },
]);
</script>

<style scoped>
/* Navigation link style */
.link-group-header a,
.link-group-item a {
  display: block;
  transition: all 0.25s ease-in-out;
}

.link-group-header .icon {
  width: 30px;
  height: 26px;
  display: inline-block;
  text-align: center;
  font-size: 1.3rem;
}

.link-group-header.active,
.link-group-item.active {
  @apply bg-gold-brand-2 text-white-ink-1;
}

/* Navigation link hover style */
.link-group-header a:hover,
.link-group-item a:hover {
  @apply text-gold-brand-1;
}

.link-group-header.active a:hover,
.link-group-item.active a:hover {
  @apply text-white-ink-1;
}
</style>
