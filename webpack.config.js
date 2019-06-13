const path = require('path');

// For bundling web component polyfills
const WebComponentsPolyfill = require('@purtuga/web-components-polyfill-webpack-plugin');

module.exports = {
	entry: {
		'core-hello': './src/core-greet/core-hello/CoreHelloElement.js',
		'core-bye': './src/core-greet/core-bye/CoreByeElement.js',
		'core-greet': './src/core-greet/CoreGreetElement.js',
		'core-slider': './src/core-slider/CoreSliderElement.js',
		'core-tooltip': './src/core-tooltip/CoreTooltipElement.js',
		'core-link': './src/core-link/CoreLinkElement.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new WebComponentsPolyfill()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
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