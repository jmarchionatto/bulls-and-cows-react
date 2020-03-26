var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/Numberchll.js',
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
            },
        ],
    },
};
