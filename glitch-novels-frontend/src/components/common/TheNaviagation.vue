<template>
  <header
    class="fixed top-0 right-0 flex h-20 w-full items-center justify-between bg-gray-bg-1 px-10 py-5"
    ref="header"
  >
    <img
      class="ml-16 max-h-full"
      ref="logo"
      src="@/assets/images/common/logo.png"
      alt="Glitch logo"
    />
    <input
      class="h-fit w-[30rem] border border-white-ink-1 bg-gray-bg-1 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
      style="font-family: 'Proxima Nova', FontAwesome, serif"
      type="text"
      placeholder="&#xF002; Search for anything"
    />
  </header>

  <nav
    class="close fixed z-40 h-full w-[20rem]"
    ref="nav"
  >
    <div
      class="toggle-btn absolute top-5 -right-5 z-50 cursor-pointer text-white-ink-1"
      @click="toggleSidebar"
    >
      <!--      <i class="fa-sharp fa-solid fa-2xl fa-bars"></i>-->
      <div class="toggle-btn-icon h-full w-full">
        <div class="toggle-btn-bar"></div>
      </div>
    </div>
    <div class="title-text sidebar-content h-full bg-gray-bg-1 px-10 pt-5 text-white-ink-1">
      <img
        class="max-h-10"
        src="@/assets/images/common/logo.png"
        alt="Glitch logo"
      />
      <div class="mt-7 space-y-3">
        <a
          href="#"
          class="py-0.5 px-2"
        >
          <span class="icon mr-2">
            <i class="fa-sharp fa-solid fa-house"></i>
          </span>
          Home
        </a>
        <div>
          <a
            href="#"
            class="py-0.5 px-2"
          >
            <span class="icon mr-2">
              <i class="fa-sharp fa-solid fa-book-open-cover"></i>
            </span>
            Titles
          </a>
          <ul class="space-y-1 font-normal">
            <li>
              <a href="#">Advanced Search</a>
            </li>
            <li class="active">
              <a href="#">Recently Added</a>
            </li>
            <li>
              <a href="#">Latest Updates</a>
            </li>
            <li>
              <a href="#">Random</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const header = ref(null);
const nav = ref(null);
const logo = ref(null);

const toggleSidebar = ($event) => {
  if (nav.value.classList.contains("close")) {
    $event.currentTarget.classList.add("open");
    header.value.classList.add("moveRight");
    nav.value.classList.remove("close");
    nav.value.classList.add("open");
  } else {
    $event.currentTarget.classList.remove("open");
    header.value.classList.remove("moveRight");
    nav.value.classList.add("close");
    nav.value.classList.remove("open");
  }
};
</script>

<style scoped>
header {
  transition: all 0.25s ease-in-out;
}

header.moveRight {
  width: calc(100% - 20rem);
}

header img {
  transition: all 0.25s ease-in-out;
}

header.moveRight img {
  margin-left: 0.25rem;
  opacity: 0;
  visibility: hidden;
}

li {
  padding: 0.125rem 0 0.125rem 1.5rem;
}

a {
  display: block;
}

nav {
  transition: all 0.25s ease-in-out;
}

nav.close {
  top: 0;
  left: -16.25rem;
}

nav.open {
  top: 0;
  left: 0;
}

.toggle-btn-icon {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
}

.toggle-btn-bar {
  @apply bg-white-ink-1;
  width: 1.75rem;
  height: 0.3rem;
  transition: all 0.5s ease-in-out;
}

.toggle-btn-bar:before,
.toggle-btn-bar:after {
  @apply bg-white-ink-1;
  content: "";
  position: absolute;
  left: 0;
  height: 0.3rem;
}

.toggle-btn-bar:before {
  width: 2.5rem;
  transform: translateY(-15px);
}

.toggle-btn-bar:after {
  width: 1rem;
  transform: translateY(15px);
}

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

nav.close .sidebar-content {
  visibility: hidden;
  opacity: 0;
  transition: all 0.25s ease-in-out;
}

.icon {
  width: 30px;
  height: 26px;
  display: inline-block;
  text-align: center;
}

.icon i {
  font-size: 1.3rem;
}

nav .active {
  @apply bg-gold-brand-2 text-white-ink-1;
}

li:hover,
a:hover {
  @apply text-gold-brand-1;
}
</style>
