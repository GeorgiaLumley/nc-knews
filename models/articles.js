const connection = require('../db/connection');

exports.getArticles = (author = '*') => connection('article')
  .select('*')
  .where(author);

exports.addNewArticle = obj => connection('article')
  .insert(obj)
  .returning('*');

exports.getArticleByArticleId = id => connection('article')
  .select('*')
  .where('article_id', id);
exports.removeArticle = article_id => connection('article')
  .del()
  .where({ article_id });

exports.getArticleComments = article_id => connection('comments').where('article_id', article_id);

exports.addNewComment = newComment => connection('comments')
  .insert(newComment)
  .returning('*');
