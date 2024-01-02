const reactRecommended = require('eslint-plugin-react/configs/recommended');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ...reactRecommended,
    plugins: {
      react,
    },
    languageOptions: 
    {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: 
      {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    rules: 
    {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
];