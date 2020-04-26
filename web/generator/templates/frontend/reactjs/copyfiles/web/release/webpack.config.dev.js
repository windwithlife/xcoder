/**
 * Created by zhangyq on 2016/5/25.
 */
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackBaseConfig = require("./webpack.config.base.js");
var cfg = Object.assign(webpackBaseConfig, {
    devtool: "cheap-module-eval-source-map"
});

const pxtorem = require('postcss-pxtorem');



process.env.NODE_ENV = 'development';
// 模块名称, 替换此处以便启动并开发对应模块
var projectModule = 'client/product';


var config = {


    //页面入口文件配置
    entry: {
        app :[path.join(__dirname,'../resources/' + projectModule + '/router.js')],
        //vendors:['react','react-dom','react-router', 'axios','amazeui-touch','react-addons-css-transition-group']
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, '../dist/' + projectModule + '/'),//用devserver时htmlt会放到这个目录
        publicPath: '/' + projectModule + '/', // html引用路径，devserver测试时，生成的目标文件在内存中路径，生成环境可访问到的路径。及目标文件引用的别的文件的内存或生产环境路径。
        filename: '[name].js' // 注意我们使用了变量
    },

    babel: {

        presets: ['es2015', 'react', 'stage-1'],
        "plugins": [["react-transform", {
            "transforms": [{
                "transform": "react-transform-hmr",
                // if you use React Native, pass "react-native" instead:
                "imports": ["react"],
                // this is important for Webpack HMR:
                "locals": ["module"]
            }]
            // note: you can put more transforms into array
            // this is just one of them!
        }],
            ['import', [{
            libraryName: 'antd',
            style: 'css'
        },{
                "libraryName": "antd-mobile",
                "style": 'css'
            },{
                libraryName: "material-ui",
                libraryDirectory:'components',
                camel2DashComponentName:false,
            }]]]
    },
    devtool: 'eval',
    externals: webpackBaseConfig.externals,

    //插件项
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',    //html模板路径
            inject:false,    //允许插件修改哪些内容，包括head与body
            hash:false,    //为静态资源生成hash值
        }),
        //new  webpack.optimize.CommonsChunkPlugin({
        //    name:['vendors'],
        //    minChunks:Infinity
        //}),
        new webpack.HotModuleReplacementPlugin()
    ],
    module:webpackBaseConfig.module,
    //其它解决方案配置
    resolve: webpackBaseConfig.resolve
};



module.exports = config;
