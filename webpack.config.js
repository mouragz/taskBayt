const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: './src/app/js/main.js'
    },
    output: {
        filename: './dist/js/[name].js'
    },
    devtool: 'source-map',
    resolveLoader: {
		moduleExtensions: ['-loader']
    }, 
    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
			{
				test: /\.json?$/,
				loader: 'json-loader'
			},
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
              },
			{
	            test: /\.scss$/,
	            loader: 'style!css!sass'
	        },
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			}
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/css/main.css', {
            allChunks: true
        })
    ]
}