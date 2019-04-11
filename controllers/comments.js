const {
  updateComment,
  decrementVotes,
  removeComment,
  fetchComments,
} = require('../models/comments');
const { formatVotes, validateId } = require('../utils/index');

exports.patchComment = (req, res, next) => {
  const votes = formatVotes(req.body);

  if (votes === false) {
    next({ status: 400, msg: 'Bad Request' });
  } else {
    const { comment_id } = req.params;

    const validatedId = validateId(comment_id);
    if (validatedId === true) {
      next({ status: 404, msg: 'Not Found' });
    }

    if (votes > 0) {
      updateComment(comment_id, votes)
        .then((updateVotes) => {
          if (updateVotes === 0) {
            return Promise.reject({
              status: 400,
              msg: 'Bad Request',
            });
          }
          res.status(200).send({ updateVotes });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      decrementVotes(comment_id, votes)
        .then((updateVotes) => {
          res.status(200).send({ updateVotes });
        })
        .catch((err) => {
          next(err);
        });
    }
  }
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((commentBeingDeleted) => {
      res.status(204).send({ commentBeingDeleted });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const { author } = req.query;
  fetchComments(author).then((comments) => {
    res.status(200).send({ comments });
  });
};
