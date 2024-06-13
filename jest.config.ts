import { JestConfigWithTsJest } from "ts-jest";

export default {
  preset: "ts-jest",
  passWithNoTests: true,
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
} as JestConfigWithTsJest;
