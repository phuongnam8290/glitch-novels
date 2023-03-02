import { unref } from "vue";

/**
 * @typedef {import('vue').Ref} Ref
 *
 * @typedef {import('vue').Component} Component
 * @property {Ref<Element>} value - A reference to this component's template ref
 */

/**
 * @function
 * @param {Ref<Element> | Ref<Element[]> | Ref<Component> | Ref<Component[]>} targetElementsRef - Represent a
 * single/group of template ref(s) that need to detect when clicks outside.
 * @param {function} callback - A callback function to be executed when the user clicks outside element(s).
 * @param {("templateRef" | "componentRef")} type - The type of elements needs to detect clicks outside.
 */
export const useClickOutside = (targetElementsRef, callback, type) => {
  const detectClickOutside = (event) => {
    const targetElements = unref(targetElementsRef);
    const target = event.target;
    let isClickInside = false;

    // If targetElements is an array of template refs, check all of the array's elements.
    if (Array.isArray(targetElements)) {
      for (const element of targetElements) {
        if (
          (type === "componentRef" && element.value.contains(target)) ||
          (type === "templateRef" && element.contains(target))
        ) {
          isClickInside = true;
          break;
        }
      }
    } else {
      if (
        (type === "componentRef" && targetElements.value.contains(target)) ||
        (type === "templateRef" && targetElements.contains(target))
      ) {
        isClickInside = true;
      }
    }

    return !isClickInside;
  };

  const handleClickOutside = (event) => {
    if (detectClickOutside(event)) {
      callback();
    }
  };

  const enableClickOutside = () => {
    document.addEventListener("click", handleClickOutside);
  };

  const disableClickOutside = () => {
    document.removeEventListener("click", handleClickOutside);
  };

  return { enableClickOutside, disableClickOutside };
};
