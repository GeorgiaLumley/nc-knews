const {
  getArticles,
  addNewArticle,
  getArticleByArticleId,
  removeArticle,
  getArticleComments,
  addNewComment,
  updateVotes,
} = require('../models/articles');
const { formatArticleQuery } = require('../utils/index');

exports.sendArticles = (req, res, next) => {
  const sortBy = req.query.sortBy;
  const orderBy = req.query.orderBy;
  const limit = req.query.limit;
  const query = formatArticleQuery(req.query);
  getArticles(query, sortBy, orderBy, limit).then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.postArticles = (req, res, next) => {
  addNewArticle(req.body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleByArticleId(article_id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id)
    .then((articlesBeingDeleted) => {
      if (articlesBeingDeleted === 1) res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  getArticleComments(article_id).then((comments) => {
    res.status(200).send({ comments });
  });
};

exports.postNewComment = (req, res, next) => {
  const newComment = req.body;
  addNewComment(newComment).then((comment) => {
    res.status(201).send({ comment });
  });
};

exports.updateArticleVotes = (req, res, next) => {
  const incVote = req.body;
  console.log(incVote);
  const { article_id } = req.params;
  updateVotes(article_id, incVote).then((updateVotes) => {
    res.status(201).send({ updateVotes });
  });
};
