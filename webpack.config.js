const path = require('path');

module.exports = {
	entry: {
		'core-hello': './src/core-hello/core-hello.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['css-loader']
			}
		]
	},
	devServer: {
		open: true,
		hot: true,
		hotOnly: true,
		contentBase: path.join(__dirname, 'dist'),
		port: 8000
	}
}