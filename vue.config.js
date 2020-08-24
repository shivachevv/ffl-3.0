module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: '0.0.0.0:8080'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/media.scss";`
      }
    }
  }
};