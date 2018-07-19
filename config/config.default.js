'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {
    security: {
      csrf: false,
      domainWhiteList: [ 'http://localhost:8000' ],
      // {
      //   ignore: ctx => isInnerIp(ctx.ip),
      // },
    },
    multipart: {
      fileSize: '200mb',
      whitelist: [
        '.png',
        '.jpg',
        '.avi',
        '.mp4',
        '.zip',
        '.mov',
      ],
    },

  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513765449219_5858';

  config.view = {
    root: path.join(appInfo.baseDir, 'app/assets'),
    mapping: {
      '.js': 'assets',
    },
  };



  config.assets = {
    publicPath: '/public',
    devServer: {
      command: 'roadhog dev',
      port: 8000,
      env: {
        BROWSER: 'none',
        DISABLE_ESLINT: true,
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000',
      },
      debug: true,
    },
  };

  config.middleware = ['errorHandler'];

  config.errorHandler = {
    match: '/api',
  };

  return config;
};
