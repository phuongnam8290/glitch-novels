<template>
  <nav
    class="fixed z-40 h-full w-[20rem]"
    ref="nav"
  >
    <!--  Toggle button  -->
    <div
      class="toggle-btn absolute top-[1.375rem] -right-4 z-50 cursor-pointer text-white-ink-1"
      ref="toggleBtn"
      @click="toggleSidebar"
    >
      <div class="toggle-btn-icon h-full w-full">
        <div class="toggle-btn-bar"></div>
      </div>
    </div>
    <!--  End of toggle button  -->

    <!--  Sidebar  -->
    <div class="title-text sidebar-content h-full bg-gray-bg-1 px-10 pt-5 text-white-ink-1">
      <!--  Logo  -->
      <img
        class="logo mt-0.5 max-h-9"
        src="@/assets/images/common/logo.png"
        alt="Glitch logo"
      />
      <!--  End of logo  -->

      <!--  Navigation links  -->
      <div class="mt-8 space-y-3">
        <div
          v-for="linkGroup in navigationLinkGroups"
          :key="linkGroup.linkGroupHeader"
        >
          <div
            class="link-group-header"
            :class="{ active: linkGroup.isActive }"
          >
            <a
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
            </a>
          </div>
          <ul class="font-normal">
            <li
              class="link-group-item py-1 pl-6"
              :class="{ active: link.isActive }"
              v-for="link in linkGroup.linkGroupItems"
              :key="link"
            >
              <a href="#"> {{ link.title }} </a>
            </li>
          </ul>
        </div>
      </div>
      <!--  End of navigation links  -->
    </div>
    <!--  End of sidebar  -->
  </nav>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useNavigationStore } from "@/stores/navigation";

const navigationLinkGroups = ref([
  {
    linkGroupHeader: "Home",
    icon: "fa-house",
    linkGroupItems: [],
  },
  {
    linkGroupHeader: "Titles",
    icon: "fa-book-open-cover",
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
    linkGroupItems: [
      { title: "About Us" },
      { title: "Site Rules" },
      { title: "Privacy Policy" },
      { title: "Announcemnets" },
    ],
  },
]);

const navigationStore = useNavigationStore();

// For toggle button click event
const toggleSidebar = () => {
  navigationStore.TOGGLE_SIDEBAR();
};

// Open / close sidebar base on state set in navigationStore
const IS_SIDEBAR_OPEN = computed(() => navigationStore.IS_SIDEBAR_OPEN);
const nav = ref(null);
const toggleBtn = ref(null);

watch(IS_SIDEBAR_OPEN, (isOpen) => {
  if (isOpen) {
    toggleBtn.value.classList.add("open");
    nav.value.classList.add("open");
  } else {
    toggleBtn.value.classList.remove("open");
    nav.value.classList.remove("open");
  }
});
</script>

<style scoped>
/* Sidebar position */
nav {
  transition: all 0.25s ease-in-out;
}

nav {
  top: 0;
  left: -16.5rem;
}

nav .sidebar-content {
  visibility: hidden;
  opacity: 0;
  transition: all 0.25s ease-in-out;
}

nav.open .sidebar-content {
  visibility: visible;
  opacity: 1;
}

nav.open {
  top: 0;
  left: 0;
}

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

/* Toggle button style */
.toggle-btn-icon {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
}

.toggle-btn-bar {
  @apply bg-white-ink-1;
  width: 1.5rem;
  height: 0.2rem;
  transition: all 0.5s ease-in-out;
}

.toggle-btn-bar:before,
.toggle-btn-bar:after {
  @apply bg-white-ink-1;
  content: "";
  position: absolute;
  left: 0;
  height: 0.2rem;
  transition: all 0.5s ease-in-out;
}

.toggle-btn-bar:before {
  width: 2.25rem;
  transform: translateY(-10px);
}

.toggle-btn-bar:after {
  width: 0.75rem;
  transform: translateY(10px);
}

/* Toggle button animation */
.toggle-btn.open .toggle-btn-bar {
  background: transparent;
}

.toggle-btn.open .toggle-btn-bar:before {
  width: 2.5rem;
  transform: rotate(45deg);
}

.toggle-btn.open .toggle-btn-bar:after {
  width: 2.5rem;
  transform: rotate(-45deg);
}

/* Toggle button hover style */
.toggle-btn:hover .toggle-btn-bar,
.toggle-btn:hover .toggle-btn-bar:before,
.toggle-btn:hover .toggle-btn-bar:after {
  @apply bg-gold-brand-1;
}

.toggle-btn.open:hover .toggle-btn-bar {
  background: transparent;
}
</style>
