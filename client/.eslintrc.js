module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential'

  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //在rules中添加自定义规则
    //关闭组件命名规则
    "vue/multi-word-component-names": "off",
  },
  overrides: [
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    }
  ]
}
