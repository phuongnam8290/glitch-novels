import { nextTick } from "vue";

export async function useScrollTopElement(elementRef, scrollPadding = 16 * 5) {
  await nextTick();

  window.scrollTo({
    top:
      elementRef.value.getBoundingClientRect().top +
      (document.documentElement.scrollTop || document.body.scrollTop) -
      scrollPadding,
    behavior: "smooth",
  });
}
