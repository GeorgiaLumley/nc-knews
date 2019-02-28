const { updateComment } = require('../models/comments');

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  updateComment(comment_id, req.body).then((comment) => {
    res.status(200).send({ comment });
  });
};
