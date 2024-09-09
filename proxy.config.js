const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://192.168.1.38:4201',
    secure: false,
    changeOrigin:true,
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = PROXY_CONFIG;
