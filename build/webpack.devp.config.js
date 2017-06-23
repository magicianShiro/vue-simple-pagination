// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
// const webpack = require('webpack')

// module.exports = {
// 	entry: {
// 		main: 'examples/main.js',
// 		// vendor: ['examples/components/App.vue']
// 	},
// 	output: {
// 		path: path.resolve(__dirname, '../dist'),
// 		filename: '[name].[hash:8].bundle.js',
// 		chunkFilename: '[name].[chunkhash:8].js'
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.vue$/,
// 				use: ['vue-loader']
// 			},
// 			{
// 				test: '/\.js$/',
// 				use: ['babel-loader'],
// 				exclude: [/node_modules/]
// 			},
// 			{
// 				test: '/\.css$/',
// 				use: ['style-loader', 'css-loader']
// 			},
// 			{
// 				test: '/\.less$/',
// 				use: ['less-loader']
// 			},
// 			{
// 				test: '/\.(png|jpe?g|gif|svg)(\?.*)?$/',
// 				use: ['url-loader']
// 			},
// 			{
// 				test: '/\.(woff2?|eot|ttf|otf)(\?.*)?$/',
// 				use: ['url-loader']
// 			}
// 		]
// 	},
// 	resolve: {
// 		alias: {
// 			'@': path.resolve(__dirname, '../src'),
// 			'examples': path.resolve(__dirname, '../examples')
// 		}
// 	},
// 	// 插件
// 	plugins: [
// 		new webpack.HashedModuleIdsPlugin(),
// 		new HtmlWebpackPlugin({
// 			template: path.resolve(__dirname, '../examples/template/index.html'),
// 			chunks: ['vendor', 'main']
// 		}),
// 		new webpack.optimize.CommonsChunkPlugin({
// 			names: ['vendor', 'manifest'],
// 			minChunks: Infinity
// 		}),
// 		new InlineManifestWebpackPlugin({
// 			name: 'webpackManifest'
// 		})
// 	]
// }
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: 'examples/main.js',
    vendor: [
      'examples/components/App.vue',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ['url-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      examples: path.resolve(__dirname, '../examples')
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/template/index.html'),
      chunks: [ 'vendor', 'main']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    })
  ]
}