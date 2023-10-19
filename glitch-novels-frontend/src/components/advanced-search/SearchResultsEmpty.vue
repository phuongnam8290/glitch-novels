<template>
  <section class="mt-16">
    <div class="flex justify-center">
      <img
        src="../../assets/images/common/no-result.png"
        class="no-result-image w-1/2 max-w-[500px]"
        alt="no result image"
      />
    </div>
    <div class="mt-8 flex flex-col items-center gap-2">
      <h1 class="no-result-header">Sad no result!</h1>
      <p class="no-result-message">
        <a>We cannot find the item you are searching for,</a>
        <a>maybe a little spelling mistake?</a>
      </p>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.no-result-image {
  filter: grayscale(100%);
}

.no-result-header {
  font-weight: bold;
  font-size: 2rem;
}

.no-result-message {
  font-size: 1.5rem;
  text-align: center;
}

.no-result-message > a:first-child:after {
  content: "\a";
  white-space: pre;
}
</style>
