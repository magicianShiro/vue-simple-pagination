const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './'),
		filename: '../index.js',
		library: 'SimplePagination',
    libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
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
				test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
				loader: 'url-loader'
			}
		],
	},
	plugins: [
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src')
		}
	}
}