const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/cities',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Replace with your backend server's URL
      changeOrigin: true,
    })
  );
};
