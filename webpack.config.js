var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const outputPath = path.resolve(__dirname,'build');
var plugins = [
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery:'jquery'
    }),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
];



module.exports = {
    devServer: {
        proxy:{
            '/api/*':{
                target:"127.0.0.1:8080",
                secure:false
            },
            '/skilltree-app/*':{
                target:'http://192.168.31.113:8080',
                secure:false
            }
        },
        port:'3000'
    },
    entry:['./src/main.jsx'],
    output:{
        path:outputPath,
        publicPath:'/assets/',
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.jsx|\.js$/,
                exclude:/node_modules/,
                loader:'babel',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(
                    "style", 'css!stylus')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style", 'css!sass')
            },
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract(
                    "style", 'css')
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            {test: /\.(jpg|png|cur)$/, loader: "url?limit=8192"}
        ]
    },
    plugins:plugins,
    devtool: 'source-map'
}