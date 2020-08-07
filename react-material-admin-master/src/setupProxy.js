const {createProxyMiddleware} = require('http-proxy-middleware');


module.exports = app => {
    console.log("转后台。。。。。。。。。")
    app.use(createProxyMiddleware(
      '/api', { 
      target: "http://127.0.0.1:3010" 
    }
    ));
};