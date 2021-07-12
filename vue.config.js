module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:8889",
        changOrigin: true,
      },
      // "/auth": {
      //   target: "http://localhost:8889",
      //   changeOrigin: true,
      // },
    },
  },
  publicPath: "./", // 基本路径
  outputDir: "dist", // 输出文件目录
  assetsDir: "./assets",
  indexPath: "index.html",
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
};
