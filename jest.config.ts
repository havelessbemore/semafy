import { JestConfigWithTsJest } from "ts-jest";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: [
    "<rootDir>/benchmarks/",
    "<rootDir>/examples/",
    "<rootDir>/src/index.ts",
    "<rootDir>/tests/",
  ],
} as JestConfigWithTsJest;
