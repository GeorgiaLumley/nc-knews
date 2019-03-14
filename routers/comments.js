const commentRouter = require('express').Router();
const { patchComment, deleteComment } = require('../controllers/comments');

commentRouter
  .route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment);

module.exports = commentRouter;
