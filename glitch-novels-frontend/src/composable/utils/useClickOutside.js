import { ref } from "vue";

/**
 * @typedef {import('vue').Ref} Ref
 *
 * @typedef {import('vue').Component} Component
 * @property {Ref<Element>} value - A reference to this component's template ref
 */

/**
 * @typedef {Object} Options
 * @property {Ref<Document | Element>} [parentElementRef] - The element that the click outside event being added to.
 * @property {Ref<Element[]>} [ignoredElementRefs] - Click these elements will not be considered as click outside.
 * Use Ref type so that element can be added/removed from the ignored list after the event listener has been registered.
 */

/** @type Options */
const defaultOptions = {
  parentElementRef: ref(document),
  ignoredElementRefs: ref([]),
};

/**
 * @function
 * @param {Ref<Element | Element[]>} targetElementsRef - Represent a single/group of template ref(s) that need to
 * detect when clicks outside.
 * @param {function} callback - A callback function to be executed when the user clicks outside element(s).
 * @param {Options} options - Additional options.
 */
export const useClickOutside = (targetElementsRef, callback, options = {}) => {
  options = { ...defaultOptions, ...options };
  const { parentElementRef, ignoredElementRefs } = options;

  const detectClickOutside = (event) => {
    const targetElements = Array.isArray(targetElementsRef.value) ? targetElementsRef.value : [targetElementsRef.value];
    const target = event.target;
    let isClickInside = false;

    // Check if the click event occurred inside ignored elements.
    for (const element of ignoredElementRefs.value) {
      if (element.contains(target)) {
        return false;
      }
    }

    for (const element of targetElements) {
      if (element.contains(target)) {
        isClickInside = true;
        break;
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
