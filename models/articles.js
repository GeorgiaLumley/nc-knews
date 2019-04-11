const connection = require('../db/connection');

exports.getArticles = (sort_by, order, limit) => connection('articles')
  .select('*')
// .count({ comment_count: "comment_id" })
// .leftJoin("comments", "comment.article_id", "article.article_id")

  .orderBy(sort_by || 'created_at', order || 'desc')
  .limit(limit || 10);

exports.addNewArticle = obj => connection('articles')
  .insert(obj)
  .returning('*');

exports.getArticleByArticleId = id => connection('articles')
  .select('*')
  .where('article_id', id);

exports.removeArticle = article_id => connection('articles')
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

exports.updateVotes = (id, votes) => connection('articles')
  .increment('votes', votes)
  .where('article_id', id)
  .returning('*');

exports.decrementVotes = (article_id, incVote) => connection('articles')
  .where('article_id', article_id)
  .decrement('votes', incVote)
  .returning('*');
