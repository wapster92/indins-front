module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'airbnb-base',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended'
  ],
  plugins: ['vue'],
  rules: {
    'max-len': 'off',
    "vue/max-attributes-per-line": "off",
    'no-plusplus': 'off',
    'radix': ["error", "as-needed"],
    'no-bitwise': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-console': ["warn", { allow: ["warn", "error"] }],
    'arrow-parens': ['error', 'as-needed'],
    'vue/attributes-order': ['warn']
  }
};
