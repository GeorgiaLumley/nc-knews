const commentRouter = require('express').Router();
const {
  patchComment,
  deleteComment,
  getComments,
} = require('../controllers/comments');
const { methodNotAllowed } = require('../controllers/err');

commentRouter.route('/').get(getComments);

commentRouter
  .route('/:comment_id')

  .patch(patchComment)
  .delete(deleteComment)
  .all(methodNotAllowed);

module.exports = commentRouter;
