const {
  updateComment,
  decrementVotes,
  removeComment
} = require("../models/comments");
const { formatVotes, validateId } = require("../utils/index");

exports.patchComment = (req, res, next) => {
  const votes = formatVotes(req.body);
  console.log("votes", votes);
  if (votes === false) {
    next({ status: 400, msg: "Bad Request" });
  } else {
    const { comment_id } = req.params;
    console.log(comment_id);
    const validatedId = validateId(comment_id);
    if (validatedId === true) {
      next({ status: 404, msg: "Not Found" });
    }
    console.log("val", validatedId);
    console.log("comment_id", comment_id);
    if (votes > 0) {
      updateComment(comment_id, votes)
        .then(updateVotes => {
          console.log("update", updateVotes);
          if (updateVotes === 0) {
            return Promise.reject({
              status: 400,
              msg: "Bad Request"
            });
          }
          res.status(200).send({ updateVotes });
        })
        .catch(err => {
          next(err);
        });
    } else {
      decrementVotes(comment_id, votes)
        .then(updateVotes => {
          res.status(200).send({ updateVotes });
        })
        .catch(err => {
          next(err);
        });
    }
  }
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(commentBeingDeleted => {
      res.status(204).send({ commentBeingDeleted });
    })
    .catch(err => {
      next(err);
    });
};
