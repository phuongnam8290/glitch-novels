<template>
  <div class="chapter">
    <h1 class="mb-10"> Chapter {{ chapter.number }} - {{ chapter.title }}</h1>
    <article v-html="chapter.content"></article>
    <div class="divider mt-10 flex w-full items-center justify-center">
      <span class="mx-10"><i class="fa-sharp fa-solid fa-book-open-cover fa-xl"></i></span>
    </div>
  </div>
</template>

<script setup>
import { number, object, string } from "yup";

defineProps({
  chapter: {
    type: Object,
    required: true,
    validator(value) {
      const schema = object({
        id: number().required().positive(),
        number: number().required().min(0),
        title: string().required(),
        content: string().required(),
      });

      try {
        schema.validateSync(value);
      } catch (error) {
        console.warn(error.errors);
        return false;
      }

      return true;
    },
  },
});
</script>

<style scoped>
.chapter h1 {
  font-size: 2rem;
  font-weight: bold;
}

.chapter:deep(p) {
  font-size: 1.3rem;
  line-height: 2;
  letter-spacing: 1px;
}

.chapter:deep(p ~ p) {
  margin-top: 1.5rem;
}

.divider span {
  flex-grow: 0;
  @apply text-gray-divider;
}

.divider::before,
.divider::after {
  flex-grow: 1;
  content: "";
  height: 1px;
  @apply border border-gray-divider;
}
</style>