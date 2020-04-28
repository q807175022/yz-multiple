// const webpack = require("webpack");
//获取命令行参数
const projectName = process.argv[3];
console.log("当前打包项目名称：" + projectName);


//页面配置参数，注意项目名称保持一致，页面结构保持一致
const entry = require("./pageConfig/entry.js");

//生成统一的页面配置结构
const multiPage = function() {
  let page = {};
  for (let item in entry) {
    page[item] = {
      entry: entry[item],
      template: `./tpl/${item}.html`,
      filename: `${item}.html`
      // favicon: `src/${item}/assets/${item}.ico`
    };
  }
  return page;
};
const page = multiPage();
//vue下配置文件参数
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = [
  "js",
  "css",
  "svg",
  "woff",
  "ttf",
  "json",
  "html"
];
const vueConfig = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH, //部署应用包时的基本 URL
  outputDir: "dist", //打包目录
  assetsDir: "static",
  pages: projectName ? page[projectName] : page,
  productionSourceMap: false, //不输出map文件
  configureWebpack: {
    plugins: [
      //开启gzip压缩
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 1,
        deleteOriginalAssets: false //是否删除原文件
      }),
     /* new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js"
      })*/
    ]
  },
  devServer: {
    proxy: {
      "/dream-admin": {
        target: "http://127.0.0.1:7001",
        changeOrigin: false
        // pathRewrite: {
        //   "^/api": ""
        // }
      }
    }
  }
};
console.log(vueConfig);
module.exports = vueConfig;
