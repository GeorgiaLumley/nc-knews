const articlesRouter = require('express').Router();
const {
  sendArticles,
  postArticles,
  sendArticleById,
  deleteArticle,
  sendArticleComments,
  postNewComment,
  updateArticleVotes,
} = require('../controllers/articles');

articlesRouter
  .route('/')
  .get(sendArticles)
  .post(postArticles);

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .delete(deleteArticle)
  .patch(updateArticleVotes);

articlesRouter
  .route('/:article_id/comments')
  .get(sendArticleComments)
  .post(postNewComment);

module.exports = articlesRouter;
