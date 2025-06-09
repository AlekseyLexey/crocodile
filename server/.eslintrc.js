module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    spyOn: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    "no-restricted-syntax": "off",
    "implicit-arrow-linebreak": "off",
    "comma-dangle": "off",
    "consistent-return": "off",
  },
};
