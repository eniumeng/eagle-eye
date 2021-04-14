const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: process.env.NODE_ENV === 'development' ? './test/main.js' : './src/index.js',
  output: {
    library: {
      name: 'eagleEye',
      type: 'umd',
    },
    path: path.resolve(__dirname, 'lib'),
    filename: 'eagle-eye.min.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './test/index.html' })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'lib'),
    compress: true,
    port: 3000
  }
}
