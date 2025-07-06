// See: https://github.com/lint-staged/lint-staged

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,jsx,ts,tsx}": [
    // Format code
    "prettier --write",
    // Run linter
    "eslint",
    // Run tests
    "cross-env NODE_ENV=test jest --bail --findRelatedTests",
  ],
};
