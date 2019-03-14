const apiRouter = require('express').Router();
const usersRouter = require('./users');
const topicRouter = require('./topics');
const articlesRouter = require('./articles');
const commentRouter = require('./comments');

apiRouter.use('/users', usersRouter);

apiRouter.use('/topics', topicRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentRouter);

apiRouter;

module.exports = apiRouter;
