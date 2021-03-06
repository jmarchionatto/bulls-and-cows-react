// webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/Index.js',
    },
    // devtool: 'eval-source-map',
    devtool: 'eval-inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Numbers Challenge',
            chunks: ['index'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                loader: require.resolve('babel-loader'),
                exclude: [path.join(__dirname, './node_modules')],
            },
        ],
    },
};
