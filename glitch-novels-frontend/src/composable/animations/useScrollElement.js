import { nextTick, unref } from "vue";

export const useScrollElement = () => {
  const scrollElement = async (elementRef, scrollPaddingInRem = 5, behavior = "smooth") => {
    const element = unref(elementRef);
    await nextTick();

    window.scrollTo({
      top:
        element.getBoundingClientRect().top +
        (document.documentElement.scrollTop || document.body.scrollTop) -
        scrollPaddingInRem * 16,
      behavior: behavior,
    });
  };

  return { scrollElement };
};
