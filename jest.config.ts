import presets from "ts-jest/presets/index.js";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  ...presets.jsWithTsESM,
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
  passWithNoTests: true,
  testEnvironment: "node",
};
