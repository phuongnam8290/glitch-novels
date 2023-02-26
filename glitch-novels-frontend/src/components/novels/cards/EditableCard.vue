<template>
  <div class="wrapper relative">
    <div class="overlay absolute top-0 left-0 z-20 h-full w-full">
      <div class="select-outer-circle absolute top-3 left-3 flex items-center justify-center rounded-full">
        <div class="select-inner-circle h-[80%] w-[80%] rounded-full"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.wrapper.selected {
  border: 2px solid theme("colors[gold-brand-1]");
}

.wrapper.selected .select-inner-circle {
  background-color: theme("colors[gold-brand-1]");
}

.overlay {
  opacity: 0;
  background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.8) 10%, transparent 20%);
  transition: opacity 0.25s ease-in-out;
}

.overlay:hover {
  opacity: 1;
}

.select-outer-circle {
  width: 25px;
  height: 25px;
  border: 2px solid theme("colors[white-ink-1]");
}
</style>
