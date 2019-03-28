const topicRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topic');
const { methodNotAllowed } = require('../controllers/err');

topicRouter
  .route('/')
  .get(sendTopics)
  .post(postTopic)
  .all(methodNotAllowed);

module.exports = topicRouter;
