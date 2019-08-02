module.exports = {
  env: {
    es6: true,
  },
  extends: ['standard', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-console': ['error', { allow: ['tron'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
