// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().overrideRules({
  // Your custom configs here
  'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
  'import/order': 0,
  'prefer-const': 0,
  'prefer-spread': 0,
  '@typescript-eslint/no-explicit-any': 1,
  '@typescript-eslint/no-unused-expressions': 0,
  '@stylistic/lines-between-class-members': 0,
  '@stylistic/brace-style': 0,
  'vue/no-multiple-template-root': 0,
})
