module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    "browser": true,
    "node": true
  },
  extends: "eslint:recommended",
  // required to lint *.vue files
  plugins: [
    "html"
  ],
  // add your custom rules here
  rules: {
    // 语句强制分号结尾
    "semi": [
      2,
      "always"
    ],
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // 生产环境禁用 debugger
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}