import mitt from "mitt";

const eventBus = mitt();

export const useEventBus = () => {
  return { eventBus };
};
