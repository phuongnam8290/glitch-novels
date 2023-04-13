import mitt from "mitt";

const eventBus = mitt();

export const useEventBus = () => eventBus;
