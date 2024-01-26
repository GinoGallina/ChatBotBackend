// .eslintrc.js
module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["import", "prettier"],
  rules: {
    // Personaliza las reglas según tus necesidades
    "no-console": "off",
    "arrow-parens": ["error", "always"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
