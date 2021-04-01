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
};
