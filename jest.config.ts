import { Config } from "jest";
import presets from "ts-jest/presets";

const config: Config = {
  ...presets.jsWithTsESM,
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
  passWithNoTests: true,
  testEnvironment: "node",
};

export default config;
