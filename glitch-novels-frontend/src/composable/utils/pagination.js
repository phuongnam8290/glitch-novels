import { computed, ref } from "vue";
import { number } from "yup";

/**
 * @typedef {Object} Options
 * @property {String} dataName - The name of data that needs to paginate. Must be in plural form.
 * @property {Number} itemsPerPage - The maximum number of items in each page.
 */

/** @type Options **/
const defaultOptions = {
  dataName: "DATA",
  itemsPerPage: 100,
};

/**
 * Composable to provide pagination capability for stores.
 *
 * @param {Ref<Array>} data - The data that need paginated.
 * @param {Options} options - The additional options.
 * @returns Object with getters, actions to complement the store
 */
export const usePagination = (data, options) => {
  options = { ...defaultOptions, ...options };

  const dataName = options.dataName.toUpperCase();

  const state = {
    CURRENT_PAGE: ref(1),
    [`${dataName}_PER_PAGE`]: ref(options.itemsPerPage),
  };

  const CHANGE_PAGE = (page) => {
    const pageValidator = number().integer().positive();

    try {
      pageValidator.validateSync(page);
    } catch (error) {
      return;
    }

    page = page > getter.TOTAL_PAGES.value ? getter.TOTAL_PAGES.value : page < 1 ? 1 : page;
    state.CURRENT_PAGE.value = page;
  };

  const getter = {
    [`CURRENT_${dataName}`]: computed(() => {
      const startTitleIndex = (state.CURRENT_PAGE.value - 1) * state[`${dataName}_PER_PAGE`].value;
      const endTitleIndex = startTitleIndex + state[`${dataName}_PER_PAGE`].value;

      return data.value.slice(startTitleIndex, endTitleIndex);
    }),
    TOTAL_PAGES: computed(() => Math.ceil(data.value.length / state[`${dataName}_PER_PAGE`].value)),
  };

  return {
    ...state,
    CHANGE_PAGE,
    ...getter,
  };
};
