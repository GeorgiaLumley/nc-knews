const commentRouter = require('express').Router();
const { patchComment } = require('../controllers/comments');

commentRouter.route('/:comment_id').patch(patchComment);

module.exports = commentRouter;
