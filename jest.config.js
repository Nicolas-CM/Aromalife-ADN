module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Si usas alias de importación
  },
  collectCoverage: true,
  coverageDirectory: "./coverage",
};
