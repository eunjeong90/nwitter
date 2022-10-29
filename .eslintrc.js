module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
  ],
  // 'import/no-extraneous-dependencies': 0,
  // 'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
  overrides: [],
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "react/function-component-definition": [
      2,
      { namedcomponents: "arrow-function" },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "react/prop-types": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
