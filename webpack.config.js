var path = require('path');


module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  node: {
    global: true,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      { 
        test: /\.xlsx$/, loader: "webpack-xlsx-loader" 
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },

      {

        test: /\.(csv|tsv)$/,

        use: [

          'csv-loader',

        ],

      },

      {

        test: /\.xml$/,

        use: [

          'xml-loader',

        ],

      },
    ],
  },
};