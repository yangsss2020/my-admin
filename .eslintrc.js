module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-multiple-empty-lines": [1, {"max": 2}],
    "comma-dangle": [0],//对象字面量项尾不能有逗号
    "spaced-comment": 0,
    "camelcase": 0,
    // "semi": [2, "always"],//语句强制分号结尾
    "no-mixed-spaces-and-tabs": 'off',
    "no-unused-vars":0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
