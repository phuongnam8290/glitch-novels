<template>
  <BaseModal>
    <div
      class="modal-content grid p-10"
      v-if="stage === 'initiation' || stage === 'processing'"
    >
      <h1 class="modal-header section-text text-center">
        <slot name="modal-header">Modal header</slot>
      </h1>

      <!--   Modal body   -->
      <div class="modal-body grid h-full overflow-auto">
        <p class="confirm-msg">
          <slot name="confirm-msg">Confirm message</slot>
        </p>

        <ul
          class="confirm-item-list custom-scrollbar overflow-auto italic"
          v-if="$slots['confirm-item-list']"
        >
          <slot name="confirm-item-list"></slot>
        </ul>

        <!--    Warning message    -->
        <div
          class="confirm-warning-msg flex gap-x-4 border-l-4 border-orange-danger-2 bg-orange-danger-1 p-5 text-orange-danger-2"
          v-if="$slots['confirm-warning-msg']"
        >
          <span>
            <i class="fa-sharp fa-solid fa-triangle-exclamation fa-lg"></i>
          </span>
          <div>
            <h2 class="text-lg font-bold">Warning</h2>
            <slot name="confirm-warning-msg"></slot>
          </div>
        </div>
        <!--    End of warning message    -->
      </div>
      <!--   End of modal body   -->

      <div class="modal-footer flex justify-end gap-x-10">
        <button
          :class="confirmBtnInfo.class"
          class="text-btn hover:text-white-ink-1"
          @click.stop="performAction"
        >
          <span>
            <i :class="confirmBtnInfo.icon"></i>
          </span>
          <span class="ml-2">{{ confirmBtnInfo.text }}</span>
        </button>

        <button
          class="text-btn"
          :disabled="stage === 'processing'"
          @click.stop="handleCloseModal"
        >
          <span>
            <i class="fa-sharp fa-light fa-xmark"></i>
          </span>
          <span class="ml-2">Cancel</span>
        </button>
      </div>
    </div>

    <SuccessModal v-else-if="stage === 'success'">
      <template #success-msg> {{ successMsg }} </template>
    </SuccessModal>
    <FailureModal
      v-else-if="stage === 'failure'"
      @retry-action="performAction"
    >
      <template #failure-msg> {{ failureNsg }} </template>
    </FailureModal>
  </BaseModal>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useEventBus } from "@/composable/utils/eventBus";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import SuccessModal from "@/components/common/modal/confirm-modal/SuccessModal.vue";
import FailureModal from "@/components/common/modal/confirm-modal/FailureModal.vue";

const props = defineProps({
  confirmBtnInfo: {
    type: Object,
    required: false,
  },
});

// Apply initial styles & text for confirm button.
const confirmBtnInfo = reactive({
  class: computed(() => {
    const color = {
      normal: "red-danger-1",
      hover: "red-danger-2",
      ...props.confirmBtnInfo?.color,
    };

    // Only work because tailwind's safelist is enabled.
    return [`bg-${color.normal}`, `hover:bg-${color.hover}`, `border-${color.normal}`, `hover:border-${color.hover}`];
  }),
  text: "Confirm",
  icon: ["fa-sharp", "fa-regular", "fa-check"],
  ...props.confirmBtnInfo,
});

// Change the icon & text of confirm button when the stage change to processing.
const stage = ref("initiation");
watch(stage, (newStage) => {
  if (newStage === "processing") {
    confirmBtnInfo.text = "Processing...";
    confirmBtnInfo.icon = ["fa-sharp", "fa-light", "fa-spinner-third", "fa-spin"];
  }
});

// Because of the detect click outside function in the BaseModal, this component can only show the Success/Failure modal
// if the action returns a promise that WILL NOT resolve immediately. Alternatively, we can use @click.stop in the
// confirm button to stop event propagation to the BaseModal.
const action = inject(
  "action",
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => reject(), 1000);
    })
);
const successMsg = ref("");
const failureNsg = ref("");
const performAction = async () => {
  stage.value = "processing";
  try {
    const response = await action();
    successMsg.value = response.data.message;
    stage.value = "success";
  } catch (error) {
    // Because the error from Axios and the backend have a different format, we must use the optional chaining & nullish
    // coalescing operator to prevent reading property of undefined value.
    failureNsg.value = error?.response?.data?.message ?? "Something went wrong while processing the data.";
    stage.value = "failure";
  }
};

// Users can close the modal only when the stage is not "processing."
const handleCloseModal = () => {
  if (stage.value !== "processing") {
    eventBus.emit("closeModal");
  }
};

const eventBus = useEventBus();
onMounted(() => eventBus.on("clickOutsideModal", handleCloseModal));
onUnmounted(() => eventBus.off("clickOutsideModal"));
</script>

<style scoped>
.modal-content {
  max-height: 80vh;
  min-width: 500px;
  max-width: 90vw;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  row-gap: 1.5rem;
}

.modal-body {
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  row-gap: 1rem;
}

.confirm-item-list {
  scrollbar-gutter: auto;
}

button {
  /* use width instead of flex-basis on flex-items to fix container mot expanding width to fit flexbox content. */
  min-width: 180px;
}
</style>
