// webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        numberchll: './src/Numberchll.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Numbers Challenge',
            chunks: ['numberchll'],
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
