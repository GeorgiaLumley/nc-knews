const apiRouter = require('express').Router();
const usersRouter = require('./users');
const topicRouter = require('./topics');
const articlesRouter = require('./articles');
const commentRouter = require('./comments');
const { apiInfo } = require('../controllers/api');
const { methodNotAllowed } = require('../controllers/err');

apiRouter.route('/').get(apiInfo);

apiRouter.use('/users', usersRouter);

apiRouter.use('/topics', topicRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentRouter);

apiRouter.all(methodNotAllowed);

module.exports = apiRouter;
