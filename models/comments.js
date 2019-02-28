const connection = require('../db/connection');

exports.updateComment = (comment_id, change) => connection
  .where('comment_id', comment_id)
  .update('votes', change)
  .returning('*');
