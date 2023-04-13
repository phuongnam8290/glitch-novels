<template>
  <div class="flex">
    <the-sidebar class="sticky top-0 h-screen shrink-0" />
    <div
      class="wrapper relative left-0 min-h-screen min-w-0 grow"
      ref="wrapper"
    >
      <the-header />

      <main>
        <router-view class="p-20"> </router-view>
      </main>

      <the-footer />
    </div>
  </div>
</template>

<script setup>
import TheSidebar from "@/components/navigation/sidebar/TheSidebar.vue";
import TheHeader from "@/components/navigation/header/TheHeader.vue";
import TheFooter from "@/components/navigation/TheFooter.vue";
</script>

<style scoped>
.wrapper {
  transition: all 0.25s ease-in-out;
}

main {
  min-height: calc(100vh - 9rem);
}
</style>
