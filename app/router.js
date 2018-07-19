'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.all('/api/*', controller.home.proxy);
  router.get('/', controller.home.index);
  router.post('/ht/upload', controller.upload.upload);
  router.post('/api/ht/login/account', controller.account.login);
  router.resources('topics', '/api/v2/topics', controller.topics);
  router.resources('video', '/api/ht/video', controller.video);
  router.resources('store', '/api/ht/store', controller.store);
  router.resources('user', '/api/ht/user', controller.user);
  router.resources('daily', '/api/ht/daily', controller.daily);
};
