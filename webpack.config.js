'use strict'
const path = require('path')
const distDir = path.resolve(__dirname, 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry:{
        index: './app/js/index.js'
    } ,
    devtool: 'inline-source-map',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: distDir,
    },
    devServer: {
        contentBase: distDir,
        port: 60800,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'YAMA',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },{
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000',
        },{
            test: /\.(hbs)$/,
            use: 'raw-loader'
        },{
            test: /\.(html)$/,
            use: 'html-loader'
        }],
    },
}