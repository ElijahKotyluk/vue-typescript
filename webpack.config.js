const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: ['./src/ts/main.ts', './src/style/main.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.bundle.js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader'
			},
			{
				test: /\.ts?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/],
				}
			},
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				loader: 'file-loader'
			},
			{
				test: /.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev
						}
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.vue', '.json']
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			templateParameters: {
				PROJECT_NAME: 'vue-typescript'
			},
			template: './public/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isDev ? 'main.css' : 'main.[hash].css',
			chunkFileName: isDev ? '[id].css' : '[id].[hash].css'
		})
	]
};
