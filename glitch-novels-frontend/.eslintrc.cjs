/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    "plugin:vitest-globals/recommended",
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true,
    "vitest-globals/env": true,
  },
}
