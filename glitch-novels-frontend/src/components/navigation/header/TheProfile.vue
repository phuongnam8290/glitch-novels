<template>
  <div
    class="profile-wrapper relative h-full"
    ref="profile"
  >
    <button
      class="profile relative h-full"
      @click="isOpen = !isOpen"
    >
      <img
        class="max-h-9 rounded-full object-contain"
        src="../../../assets/images/profile/avatar.jpg"
        alt="avatar"
      />
    </button>

    <!--  Profile Dropdown   -->
    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <div
        class="profile-dropdown absolute top-full right-0 mt-3 border border-gray-bg-2 bg-gray-bg-1 py-4"
        v-if="isOpen"
      >
        <div class="contact-info grid gap-x-4 px-4">
          <div class="avatar-lg">
            <img
              class="rounded-full"
              src="../../../assets/images/profile/avatar.jpg"
              alt="avatar"
            />
          </div>
          <span class="username font-bold">Louis N Kiss</span>
          <span class="email">chelsie_hell@gmail.com</span>
        </div>

        <div class="mode-grid">
          <span>
            <i class="fa-sharp fa-solid fa-moon fa-xl"></i>
          </span>
          <div class="flex justify-between">
            <span>Dark mode</span>
            <toggle-switch
              id="dark-mode-switch"
              :switch-style="darkModeSwitchStyle"
              v-model="darkMode"
            />
          </div>

          <span>
            <i class="fa-sharp fa-solid fa-pen-line fa-lg"></i>
          </span>
          <div class="flex justify-between">
            <span>Edit mode</span>
            <toggle-switch
              id="edit-mode-switch"
              v-model="editMode"
            />
          </div>
        </div>

        <div
          class="controls-grid"
          v-for="(menu, index) in menus"
          :key="index"
        >
          <a
            class="row-wrapper"
            v-for="item in menu"
            :key="item.title"
            :href="item.link"
            @click="isOpen = false"
          >
            <span>
              <i :class="item.icon"></i>
            </span>
            <div>
              <span>{{ item.title }}</span>
            </div>
          </a>
        </div>
      </div>
    </Transition>
    <!--  End of Profile Dropdown  -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditModeStore } from "@/stores/editMode";
import { useClickOutside } from "@/composable/utils/useClickOutside";

import ToggleSwitch from "@/components/common/ToggleSwitch.vue";

const editModeStore = useEditModeStore();
const { editMode } = storeToRefs(editModeStore);
const darkMode = ref(true);

// Set dark mode switch style
const darkModeSwitchStyle = reactive({
  onStyle: {
    icon: "fa-sharp fa-solid fa-moon fa-sm",
    color: "#3a3494",
    bgColor: "#3a3494",
  },
  offStyle: {
    icon: "fa-sharp fa-solid fa-sun-bright fa-sm",
    color: "#1DD7F6",
    bgColor: "#1DD7F6",
  },
});

// The array used to populate the menus
const menus = [
  [
    { icon: "fa-sharp fa-solid fa-books fa-lg", title: "Bookshelf", link: "#" },
    { icon: "a-sharp fa-solid fa-envelope fa-lg", title: "Notifications", link: "#" },
    { icon: "fa-sharp fa-solid fa-gear fa-lg", title: "Settings", link: "#" },
  ],
  [{ icon: "fa-sharp fa-solid fa-power-off fa-lg", title: "Log out", link: "#" }],
];

// The variable used to open/close profile dropdown
const isOpen = ref(false);

// Close the profile dropdown when click outside.
const profile = ref(null);
const { enableClickOutside, disableClickOutside } = useClickOutside(profile, () => (isOpen.value = false));
onMounted(() => enableClickOutside());
onUnmounted(() => disableClickOutside());
</script>

<style scoped>
.contact-info {
  grid-template-columns: 50px 200px;
  grid-template-areas:
    "avatar username"
    "avatar email";
}

.avatar-lg {
  grid-area: avatar;
}

.username {
  grid-area: username;
}

.email {
  grid-area: email;
  font-size: 0.8rem;
}

.controls-grid {
  padding: 0.75rem 0.5rem;
  display: grid;
  grid-template-columns: 30px 1fr;
  border-bottom: 1px solid theme("colors[gray-bg-2]");
}

.mode-grid {
  display: grid;
  padding: 1rem;
  grid-template-columns: max-content 1fr;
  grid-gap: 1rem;
  border-bottom: 1px solid theme("colors[gray-bg-2]");
}

.controls-grid:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.row-wrapper {
  display: contents;
  /*cursor: pointer;*/
}

.row-wrapper > * {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  transition: all 0.25s ease-in-out;
}

.row-wrapper > *:nth-child(1) {
  padding-left: 0.5rem;
}

.row-wrapper > *:nth-child(2) {
  padding-left: 1rem;
  padding-right: 0.5rem;
}

.row-wrapper:hover > * {
  background-color: theme("colors[gold-brand-2]");
  color: theme("colors[white-ink-1]");
}
</style>
