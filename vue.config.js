// let publicPath = process.env.NODE_ENV === 'production' ? './' : './';
module.exports = {
  // publicPath,
  // productionSourceMap: false,
  devServer: {
    // proxy: {
    //   '^/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     secure:false,
    //     logLevel: 'debug'
    //   },
    // }
    proxy: 'http://192.168.1.103:3000/'
  }
};
