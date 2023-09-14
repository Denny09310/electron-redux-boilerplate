module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'ts-prefixer',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: [
    'node_modules',
    'build',
    'dist',
    '.vscode',
    '.github',
    '.idea',
    '.eslintrc.cjs',
    'prettier.config.js',
    'vite.config.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks', 'jsx-a11y'],
  rules: {
    'sort-keys-fix/sort-keys-fix': ['off'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
