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
    new webpack.HotModuleReplacementPlugin()
];



module.exports = {
    devServer: {
        proxy:{
            '/skilltree-app/*':{
                target:'http://127.0.0.1:8080',
                secure:false
            }
        },
        historyApiFallback:true,
        port:'3000',
        hot: true,
        inline: true
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
                test:/\.jsx$/,
                exclude:/node_modules/,
                loaders:['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel'
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
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    "style", 'css!less')
            },
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract(
                    "style", 'css')
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg)\w*/,
                loader: 'file'
            },
            {
                test:/\.json$/,
                loader:'json'
            }
        ]
    },
    babel: {
        presets: ['es2015','react','stage-0']
    },
    plugins:plugins,
    devtool: 'source-map'
}