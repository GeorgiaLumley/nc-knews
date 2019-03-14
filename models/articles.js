const connection = require('../db/connection');

exports.getArticles = (query, order, sort_by, limit) => connection('article')
  .select('*')
  .where(query)
  .orderBy(order || 'created_at', sort_by || 'desc')
  .limit(limit || 10);

exports.addNewArticle = obj => connection('article')
  .insert(obj)
  .returning('*');

exports.getArticleByArticleId = id => connection('article')
  .select('*')
  .where('article_id', id);

exports.removeArticle = article_id => connection('article')
  .del()
  .where({ article_id });

exports.getArticleComments = (article_id, order, sort_by, limit) => connection('comments')
  .select('*')
  .where('article_id', article_id)
  .orderBy(sort_by || 'created_at', order || 'desc')
  .limit(limit || 10);

exports.addNewComment = newComment => connection('comments')
  .insert(newComment)
  .returning('*');

exports.updateVotes = (id, incVote) => connection('article')
  .increment('votes', incVote)
  .where('article_id', id);

exports.decrementVotes = (article_id, incVote) => connection('article')
  .where('article_id', article_id)
  .decrement('votes', incVote);
