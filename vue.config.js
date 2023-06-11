const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8848,
    proxy:{
      "/api":{
        target :"http://localhost:8858",
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  
  chainWebpack: config => {
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true,
      });
  }
})