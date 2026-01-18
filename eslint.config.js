import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '*.log', '*.lock', 'public/**', 'plugins/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        es2020: true,
        process: true,
        console: true,
        importScripts: true,
        workbox: true,
      },
    },
  },
  eslint.configs.recommended,
  ...vuePlugin.configs['flat/essential'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
      },
    },
    plugins: {
      vue: vuePlugin,
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-debugger': 'off',
      'no-useless-escape': 'off',
    },
  },
  prettierConfig,
];
