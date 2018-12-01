const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader

const compiler = webpack({
	mode: 'development',
	entry: {
		main: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		// alias、
		alias: {
			"vue$": "vue/dist/vue.esm.js"
		},
		modules: [ // 告诉 webpack 解析模块时应该搜索的目录
			"node_modules",
		],
		extensions: ["*", ".js", ".vue", ".jsx", ".css"] // 解析扩展名
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/, 
				exclude: /node_modules/,
				include: [ // 解析的文件夹
					path.resolve(__dirname, 'src') 
				],
				loader: "babel-loader" 
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
	]
});

const watching = compiler.watch({
  aggregateTimeout: 300,
}, (err, stats) => {
	if (err) {
		console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
		return;
	}

	const info = stats.toJson();

	if (stats.hasErrors()) {
		console.error(info.errors);
	}

	if (stats.hasWarnings()) {
		console.warn(info.warnings);
	}

	console.log(stats.toString({
		chunks: false,  // 使构建过程更静默无输出
		colors: true    // 在控制台展示颜色
	}));
});
