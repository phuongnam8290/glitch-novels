/**
 * @typedef {Object} Author
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} Genre
 * @property {number} id
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} Chapter
 * @property {number} id
 * @property {number} number
 * @property {string} title
 * @property {{id: number, title: string}} novel
 * @property {string} createdDate
 * @property {?string} content
 * @property {?number} previousChapterId
 * @property {?number} nextChapterId
 */

/**
 * @typedef {Object} Novel
 * @property {number} id
 * @property {string} title
 * @property {string} coverUrl
 * @property {string} synopsis
 * @property {Author} author
 * @property {Genre[]} genres
 * @property {Tag[]} tag
 * @property {Chapter[]} chapters
 * @property {string} createdDate
 * @property {string} lastUpdatedDate
 */

export {};
