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
  extends: ['@croutonn/eslint-config/javascript-loose'],
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
      extends: ['@croutonn/eslint-config/javascript-test'],
    },
  ],
}
