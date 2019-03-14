const {
  updateComment,
  decrementVotes,
  removeComment,
} = require('../models/comments');

exports.patchComment = (req, res, next) => {
  const incVotes = req.body;
  const { comment_id } = req.params;

  if (incVotes.incVotes > 0) {
    updateComment(comment_id, incVotes)
      .then((updateVotes) => {
        res.status(201).send({ updateVotes });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    decrementVotes(comment_id, incVotes)
      .then((updateVotes) => {
        res.status(201).send({ updateVotes });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((commentBeingDeleted) => {
      res.status(204).send({ commentBeingDeleted });
    })
    .catch((err) => {
      console.log(err);
    });
};
