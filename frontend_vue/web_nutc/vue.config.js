// vue.config.js
const path = require("path");
module.exports = {
    devServer: {
      proxy: 'http://localhost:3000'
    },
    outputDir: path.resolve(__dirname, "../../client/nutc_web"),
    publicPath:".",
  }