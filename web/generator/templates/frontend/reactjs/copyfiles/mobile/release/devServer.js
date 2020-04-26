/**
 * Created by zhangyq on 2016/10/18.
 */
var fs = require('fs');
var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.config.dev.js");
webpackCfg.entry.app.unshift("webpack-dev-server/client?http://localhost:5389/", "webpack/hot/dev-server");
//webpackCfg.entry.app.unshift("webpack-dev-server/client?http://localhost:5389/", "webpack/hot/only-dev-server");



fs.exists("../dist/index.html",function(exists){
  if(!exists){
    fs.writeFileSync("../dist/index.html",fs.readFileSync("./index.html", 'utf-8'),'utf-8');
  }
});

//webpackCfg.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(webpackCfg), modulePath = webpackCfg.output.publicPath;
var port = 5389;
//init server
var app = new webpackDevServer(compiler, {
  //注意此处publicPath必填
  hot: true,
  historyApiFallback: true,
  //contentBase: path.join(__dirname, '../dist' + modulePath),
  contentBase: path.join(__dirname, '../dist/'),
  publicPath: modulePath,
});

app.listen(port, "0.0.0.0", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("listen at http://localhost:" + port);
  }
});

