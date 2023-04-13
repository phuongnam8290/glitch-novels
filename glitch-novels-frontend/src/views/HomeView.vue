<template>
  <!--  <h1>Home page</h1>-->
  <Teleport
    to="body"
    v-if="showModal"
  >
    <ConfirmModal>
      <template #header>
        <span>Delete novels</span>
      </template>
      <template #body>
        <div class="modal-body-content grid h-full">
          <p class="message-header">Are you sure you want to delete</p>
          <ul class="message-item-list custom-scrollbar overflow-auto">
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg 123</p> </li>
            <li> <p>rainy_day.jpeg 456</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg 123</p> </li>
            <li> <p>rainy_day.jpeg 456</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg 123</p> </li>
            <li> <p>rainy_day.jpeg 456</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg 123</p> </li>
            <li> <p>rainy_day.jpeg 456</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg 123</p> </li>
            <li> <p>rainy_day.jpeg 456</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg 123</p> </li>
            <li> <p>rainy_day.jpeg 456</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
            <li> <p>rainy_day.jpeg</p> </li>
          </ul>
          <div class="flex gap-x-4 border-l-4 border-orange-danger-2 bg-orange-danger-1 p-5 text-orange-danger-2">
            <span>
              <i class="fa-sharp fa-solid fa-triangle-exclamation fa-lg"></i>
            </span>
            <div>
              <h2 class="text-lg font-bold">Warning</h2>
              <p>
                By deleting these
                <span class="font-bold"> 5 </span>
                novels,
                <span class="font-bold"> 15 </span>
                chapters will also be delete.
              </p>
              <p class="mt-0 font-bold"> You cannot undo these action. </p>
            </div>
          </div>
        </div>
      </template>
      <!--    <template #footer>-->
      <!--      <span>Delete media?</span>-->
      <!--    </template>-->
    </ConfirmModal>
  </Teleport>
</template>

<script setup>
import ConfirmModal from "@/components/common/modal/confirm-modal/ConfirmModal.vue";
import { ref } from "vue";
import { useEventBus } from "@/composable/utils/eventBus";

const eventBus = useEventBus();
const showModal = ref(true);
eventBus.on("closeModal", () => (showModal.value = false));
</script>

<style scoped>
.modal-body-content {
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  row-gap: 1rem;
}
</style>
