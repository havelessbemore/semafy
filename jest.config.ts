import { JestConfigWithTsJest } from "ts-jest";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: [
    "<rootDir>/benchmarks/",
    "<rootDir>/examples/",
    "<rootDir>/src/index.ts",
    "<rootDir>/tests/",
  ],
} as JestConfigWithTsJest;
