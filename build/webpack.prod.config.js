const path = require('path')

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
				loader: 'less-loder'
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
		
			}
		],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src')
		}
	}
}