import { useNavigationStore } from "@/stores/navigation";
import { computed, watch } from "vue";

export const useMoveRight = (elementRef) => {
  const navigationStore = useNavigationStore();
  const IS_SIDEBAR_OPEN = computed(() => navigationStore.IS_SIDEBAR_OPEN);

  watch(IS_SIDEBAR_OPEN, (isOpen) => {
    if (isOpen) {
      elementRef.value.classList.add("moveRight");
    } else {
      elementRef.value.classList.remove("moveRight");
    }
  });
};
