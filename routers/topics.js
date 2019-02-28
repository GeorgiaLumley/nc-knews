const topicRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topic');

topicRouter
  .route('/')
  .get(sendTopics)
  .post(postTopic);

module.exports = topicRouter;
