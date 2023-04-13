<template>
  <BaseModal>
    <div
      class="modal-content grid p-10"
      v-if="stage === 'initiation' || stage === 'processing'"
    >
      <div class="modal-header section-text text-center">
        <slot name="header"></slot>
      </div>
      <div class="modal-body custom-scrollbar overflow-auto">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer flex justify-around">
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
      </div>
    </div>

    <SuccessModal
      v-else-if="stage === 'success'"
      :success-msg="props.successMsg"
    />
    <FailureModal
      v-else-if="stage === 'failure'"
      :failure-msg="props.failureMsg"
      @retry-action="performAction"
    />
  </BaseModal>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useEventBus } from "@/composable/utils/eventBus";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import SuccessModal from "@/components/common/modal/confirm-modal/SuccessModal.vue";
import FailureModal from "@/components/common/modal/confirm-modal/FailureModal.vue";

const props = defineProps({
  confirmBtnInfo: {
    type: Object,
    required: false,
  },
  successMsg: {
    type: String,
    required: false,
  },
  failureMsg: {
    type: String,
    required: false,
  },
  action: {
    type: Function,
    required: true,
    default() {
      // Return a Promise that will resolve/reject in 1 second to simulate communication with the back-end
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(), 1000);
      });
    },
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
const performAction = async () => {
  stage.value = "processing";

  try {
    await props.action();
    stage.value = "success";
  } catch (error) {
    stage.value = "failure";
  }
};

// Users can close the modal only when the stage is not "processing."
const eventBus = useEventBus();
eventBus.on("closeBaseModal", () => {
  if (stage.value !== "processing") {
    eventBus.emit("closeModal");
  }
});
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

button {
  /* use width instead of flex-basis on flex-items to fix container mot expanding width to fit flexbox content. */
  width: 200px;
}
</style>
