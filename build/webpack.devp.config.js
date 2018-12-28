const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: {
		main: 'examples/main.js',
		// vendor: ['examples/components/App.vue']
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
				test: /\.less$/,
				use:[{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'less-loader'
				}]
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
			'examples': path.resolve(__dirname, '../examples')
		}
	},
	// 插件
	plugins: [
		new VueLoaderPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../examples/template/index.html'),
			chunks: ['webpackManifest', 'vendor', 'main']
		})
	],
	optimization: {
		// webpack4中InlineManifestWebpackPlugin插件的使用方式
		runtimeChunk: { 
			name: 'webpackManifest'
		},
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					minChunks: 1
				}
			}
		}
	}
}