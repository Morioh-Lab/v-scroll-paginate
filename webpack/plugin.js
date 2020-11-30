var path = require('path'),
  { VueLoaderPlugin } = require('vue-loader'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {  
  target: 'web',  
  entry: {
    'scroll-paginate': ['./src/index.js']
  },
  externals: {
    vue: 'window.Vue'
  },

  output: {
    path: path.join(__dirname, '../dist'),
    //filename: '[name].[hash:8].js',
    filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
    publicPath: process.env.BASE_URL || '/',
    // libraryTarget: 'commonjs2',
    library: 'ScrollPaginate',
    // libraryTarget: 'commonjs2',
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        loader: 'babel-loader'
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            //presets: ['es2015', "stage-2"],
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          },
          // other vue-loader options go here
        }
      },


      {
        test: /\.s?[ac]ss$/,
        use: [

          //process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,

          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules']
              },
              // Prefer Dart Sass
              implementation: require('sass'),
              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
            }
          }


        ]
      }



    ]
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
    // }),

    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production' ? '[name].min.css' : '[name].css'
    }),
    // new OptimizeCssAssetsPlugin(),
    new VueLoaderPlugin(),
  ]

}




