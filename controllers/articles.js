const {
  getArticles,
  addNewArticle,
  getArticleByArticleId,
  removeArticle,
  getArticleComments,
  addNewComment,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  getArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err);
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
