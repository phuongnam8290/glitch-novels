import { nextTick, unref } from "vue";

export const useScrollElement = () => {
  const scrollElement = async (elementRef, scrollMarginOptions, scrollOptions) => {
    scrollMarginOptions = {
      scrollMarginTopInRem: 5,
      scrollMarginBottomInRem: 0,
      ...scrollMarginOptions,
    };

    scrollOptions = {
      behavior: "smooth",
      block: "start",
      inline: "nearest",
      ...scrollOptions,
    };

    const element = unref(elementRef);
    await nextTick();

    element.style.scrollMarginTop = `${scrollMarginOptions.scrollMarginTopInRem * 16}px`;
    element.style.scrollMarginBottom = `${scrollMarginOptions.scrollMarginBottomInRem * 16}px`;
    element.scrollIntoView({ ...scrollOptions });
  };

  return { scrollElement };
};
