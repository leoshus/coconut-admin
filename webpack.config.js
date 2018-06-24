const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
	devtool: "eval-source-map",
	entry: __dirname + "/src/main.js",
	output: {
		path: __dirname + "/build",
		filename: "main.js"
	},
	devServer: {
		contentBase: "./dist",
		historyApiFallback: true,
		inline: true,
		port: 8080
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"env","react"
						]
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'
						}
					},
					{
						loader: "postcss-loader"
					}
				]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有 翻版必究'),
		new htmlWebpackPlugin({
			template: __dirname + "/src/index.tmpl.html"
		}),
		new webpack.HotModuleReplacementPlugin(),//热加载插件
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new extractTextPlugin('main.css')
	]
};