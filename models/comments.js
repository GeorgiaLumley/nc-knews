const connection = require('../db/connection');

exports.updateComment = (comment_id, incVotes) => connection('comments')
  .where('comment_id', comment_id)
  .increment('votes', incVotes);

exports.decrementVotes = (comment_id, incVotes) => connection('comments')
  .where('comment_id', comment_id)
  .decrement('votes', incVotes);

exports.removeComment = comment_id => connection('comments')
  .del()
  .where('comment_id', comment_id);
