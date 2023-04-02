import { ref, unref } from "vue";

/**
 * @typedef {import('vue').Ref} Ref
 *
 * @typedef {import('vue').Component} Component
 * @property {Ref<Element>} value - A reference to this component's template ref
 */

/**
 * @function
 * @param {Ref<Element | Element[]>} targetElementsRef - Represent a
 * single/group of template ref(s) that need to detect when clicks outside.
 * @param {function} callback - A callback function to be executed when the user clicks outside element(s).
 * @param {Ref<Document | Element>} parentElementRef - The element that the click outside event being added to.
 * @param {Ref<Element[]>} [ignoredElementRefs] - Click these elements will not be considered as click outside. Use Ref
 * type so that element can be added/removed from the ignored list after the event listener has been registered.
 */
export const useClickOutside = (targetElementsRef, callback, parentElementRef = ref(document), ignoredElementRefs) => {
  const detectClickOutside = (event) => {
    const targetElements = unref(targetElementsRef);
    const target = event.target;
    let isClickInside = false;

    // Check if the click event occurred inside ignored elements.
    if (ignoredElementRefs) {
      for (const element of ignoredElementRefs.value) {
        if (element.contains(target)) {
          isClickInside = true;
          break;
        }
      }
      if (isClickInside) {
        return false;
      }
    }

    if (Array.isArray(targetElements)) {
      for (const element of targetElements) {
        if (element.contains(target)) {
          isClickInside = true;
          break;
        }
      }
    } else {
      if (targetElements.contains(target)) {
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
    parentElementRef.value.addEventListener("click", handleClickOutside);
  };

  const disableClickOutside = () => {
    parentElementRef.value.removeEventListener("click", handleClickOutside);
  };

  return { enableClickOutside, disableClickOutside };
};
