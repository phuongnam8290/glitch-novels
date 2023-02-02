<template>
  <a
    href="#"
    class="tag relative inline-block"
  >
    <div class="triangle absolute"></div>
    <span class="content whitespace-nowrap">
      <slot></slot>
    </span>
  </a>
</template>

<script setup></script>

<style scoped>
a:hover {
  color: theme("colors[white-ink-1]");
}

.tag {
  font-size: 0.8rem;
  line-height: 0.8rem;
  background-image: linear-gradient(to bottom right, theme("colors[gold-brand-2]") 49.5%, transparent 50%);
  background-size: 200% 200%;
  background-position: bottom right;
  border: 1px solid theme("colors[gold-brand-2]");
  padding: 0.5rem 1.5rem;
  transition: all 0.5s;
}

.tag:hover {
  background-position: top left;
}

.tag .triangle {
  top: -1px;
  left: -1px;
  width: 0;
  height: 0;
  border-top: 10px solid theme("colors[gold-brand-2]");
  border-right: 10px solid transparent;
}
</style>
