import { number } from "yup";

/**
 * Utility methods to provide pagination capability for stores.
 *
 * @param dataName The dataName parameter is the name of data that needs to paginate. Must be in plural form.
 * @returns Object with getters, actions to complement the store
 */
export default function (dataName) {
  return {
    state: {
      currentPage: 1,
      [`${dataName}PerPage`]: 100,
    },
    actions: {
      CHANGE_PAGE(page) {
        const pageValidator = number().integer().positive();

        try {
          pageValidator.validateSync(page);
        } catch (error) {
          return;
        }

        page = page > this.TOTAL_PAGES ? this.TOTAL_PAGES : page < 1 ? 1 : page;
        this.currentPage = page;
      },
    },
    getters: {
      [`CURRENT_${dataName.toUpperCase()}`](state) {
        const startTitleIndex = (state.currentPage - 1) * state[`${dataName}PerPage`];
        const endTitleIndex = startTitleIndex + state[`${dataName}PerPage`];

        return state[dataName].slice(startTitleIndex, endTitleIndex);
      },
      TOTAL_PAGES(state) {
        return Math.ceil(state[dataName].length / state[`${dataName}PerPage`]);
      },
      CURRENT_PAGE(state) {
        return state.currentPage;
      },
    },
  };
}
