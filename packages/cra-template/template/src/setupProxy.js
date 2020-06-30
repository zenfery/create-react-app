/* eslint-disable strict */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(['/proxy-cloud-api', '/proxy-api'], {
      target: 'http://10.20.114.103:8781',
      // target: "http://localhost:8700",
      //pathRewrite: {'^/api': ''},
      changeOrigin: true,
      onProxyReq: function(proxyReq) {
        proxyReq.setHeader('Host', 'secure-portal-local.chinacache.com:3000');
        //console.log(req, res);
      },
    })
  );
};
