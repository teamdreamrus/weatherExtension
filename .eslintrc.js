module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended'
  ],
  env: {
    es6: true
  },
  plugins: ['prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 10,
    requireConfigFile: false,
    sourceType: 'unambiguous'
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'prefer-destructuring': 0,
    'vue/no-unused-components': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
        multiline: 1
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'import/no-unresolved': [2, { ignore: ['.svg\\?inline$'] }],
    'vue/singleline-html-element-content-newline': ['off']
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './source']],
        extensions: ['.js', '.vue']
      }
    }
  },
  globals: {
    require: true,
    process: true,
    module: true,
    chrome: true
  }
}
