<template>
  <div class="edit-header flex items-center justify-between bg-gold-brand-2 py-1 pl-20">
    <span class="title-text">0 items selected</span>
    <div class="control-buttons flex">
      <button>
        <i class="fa-sharp fa-solid fa-plus fa-lg"></i>
      </button>
      <button>
        <i class="fa-sharp fa-regular fa-pen-line"></i>
      </button>
      <button>
        <i class="fa-sharp fa-regular fa-eye-slash"></i>
      </button>
      <button>
        <i class="fa-sharp fa-solid fa-trash-can-xmark"></i>
      </button>

      <div class="border-l">
        <button class="btn-close w-[5rem]">
          <i class="fa-light fa-xmark fa-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.control-buttons {
  font-size: 1.5rem;
}

.control-buttons button {
  height: 50px;
  width: 50px;
}

.control-buttons button ~ button {
  margin-left: 1rem;
}

.control-buttons > button:last-of-type {
  margin-right: 1rem;
}

.control-buttons .btn-close {
  margin: 0 calc((5rem - 50px) / 2);
}
</style>
