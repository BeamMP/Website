import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: ['node_modules', 'dist', '*.log', '.DS_Store'],
  },

  // Base JavaScript config
  js.configs.recommended,

  // Vue 3 recommended config
  ...pluginVue.configs['flat/recommended'],

  // Global configuration
  {
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        prompt: 'readonly',
        getComputedStyle: 'readonly',
        // Node globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      // Prettier integration
      ...configPrettier.rules,
      'prettier/prettier': 'error',

      // Vue-specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'warn',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
        },
      ],

      // General JavaScript rules
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]
