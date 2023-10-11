export default {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(ts|tsx)": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)",
  moduleFileExtensions: ["ts", "js", "tsx"],
  collectCoverage: true,
  clearMocks: true,
  testEnvironment: 'jsdom'
}
