module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'jsx-a11y/anchor-is-valid': [0],
    'react/no-unescaped-entities': [0]
  }
};