const path = require('path');

module.exports = {
	entry: {
		'core-hello': './src/core-greet/core-hello/CoreHelloElement.js',
		'core-bye': './src/core-greet/core-bye/CoreByeElement.js',
		'core-greet': './src/core-greet/CoreGreetElement.js',
		'core-slider': './src/core-slider/CoreSliderElement.js',
		'core-tooltip': './src/core-tooltip/CoreTooltipElement.js'
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