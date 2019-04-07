const topicRouter = require('express').Router();
const { sendTopics, postTopic, deleteTopic } = require('../controllers/topic');
const { methodNotAllowed } = require('../controllers/err');

topicRouter
  .route('/')
  .get(sendTopics)
  .post(postTopic)
  .all(methodNotAllowed);

topicRouter.route('/:topic_id').delete(deleteTopic);

module.exports = topicRouter;
