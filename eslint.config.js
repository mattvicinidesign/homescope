import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Flag Tailwind arbitrary values in className strings
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/className.*\\[/]',
          message: 'Tailwind arbitrary values ([...]) in className are forbidden. Use token-backed utilities instead.',
        },
        {
          selector: 'TemplateLiteral[quasis.0.value.raw=/.*\\[.*px.*\\]/]',
          message: 'Tailwind arbitrary values ([...px...]) in className are forbidden. Use token-backed utilities instead.',
        },
      ],
    },
  },
])
