/**
 * @type import("eslint").Linter.Config
 */
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb/base', 'prettier'],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-restricted-imports': ['error', { patterns: ['./', '../'] }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'internal',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/test/**/*.js',
        '**/tests/**/*.js',
        '**/__tests__/**/*.js',
        '**/*.test.js',
        '**/*.spec.js',
      ],
      env: {
        mocha: true,
      },
      rules: {
        'no-restricted-imports': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
