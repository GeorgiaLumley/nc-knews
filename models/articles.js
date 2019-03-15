const connection = require('../db/connection');

exports.getArticles = (query, sort_by, order, limit) => connection('article')
  .select('*')
// .count({ comment_count: "comment_id" })
// .leftJoin("comments", "comment.article_id", "article.article_id")
  .where(query)
  .orderBy(sort_by || 'created_at', order || 'desc')
  .limit(limit || 10);

exports.addNewArticle = obj => connection('article')
  .insert(obj)
  .returning('*');

exports.getArticleByArticleId = id => connection('article')
  .select('*')
  .where('article_id', id);

exports.removeArticle = article_id => connection('article')
  .where({ article_id })
  .del();

exports.getArticleComments = (article_id, order, sort_by, limit) => connection('comments')
  .select('*')
  .where('article_id', article_id)
  .orderBy(sort_by || 'created_at', order || 'desc')
  .limit(limit || 10);

exports.addNewComment = newComment => connection('comments')
  .insert(newComment)
  .returning('*');

exports.updateVotes = (id, votes) => connection('article')
  .increment('votes', votes)
  .where('article_id', id)
  .returning('*');

exports.decrementVotes = (article_id, incVote) => connection('article')
  .where('article_id', article_id)
  .decrement('votes', incVote);
