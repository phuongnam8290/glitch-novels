import { nextTick, unref } from "vue";

export const useScrollElement = () => {
  const scrollElement = async (elementRef, scrollPadding = 16 * 5) => {
    const element = unref(elementRef);
    await nextTick();

    window.scrollTo({
      top:
        element.getBoundingClientRect().top +
        (document.documentElement.scrollTop || document.body.scrollTop) -
        scrollPadding,
      behavior: "smooth",
    });
  };

  return { scrollElement };
};
