const {
  getArticles,
  addNewArticle,
  getArticleByArticleId,
  removeArticle,
  getArticleComments,
  addNewComment,
  updateVotes,
  decrementVotes,
} = require('../models/articles');
const {
  formatArticleQuery,
  correctQuerySortBy,
  correctQueryOrder,
  validatePost,
  validateId,
  formatVotes,
  topicAndAuthorHandler,
} = require('../utils/index');
const { getUserByUsername } = require('../models/users');

exports.sendArticles = (req, res, next) => {
  const { sort_by, order, limit } = req.query;
  const correctQureySort = correctQuerySortBy(req.query.sort_by);
  const queryOrder = correctQueryOrder(req.query.order);

  if (correctQureySort === 'err' || queryOrder === 'err') {
    next({ status: 400, msg: 'Bad Request' });
  } else {
    getArticles(sort_by, order, limit)
      .then((articles) => {
        console.log('hey', articles);
        if (req.query.author === undefined && req.query.topic === undefined) {
          res.status(200).send({ articles });
        } else {
          const author = req.query.author;
          const topic = req.query.topic;
          const filtered = topicAndAuthorHandler(articles, author, topic);
          console.log('hi', filtered);
          if (filtered.length === 0) {
            next({ msg: 'Bad Request' });
          }

          res.status(200).send({ filtered });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.postArticles = (req, res, next) => {
  const correctPost = validatePost(req.body);
  if (correctPost === 'err') {
    next({ status: 400, msg: 'Bad Request' });
  }
  addNewArticle(req.body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendArticleById = (req, res, next) => {
  const correct_id = validateId(req.params);

  if (correct_id === false) {
    next({ status: 404, msg: 'Not Found' });
  } else {
    const { article_id } = req.params;
    getArticleByArticleId(article_id)
      .then(([article]) => {
        if (article === undefined) {
          return Promise.reject({ status: 404, msg: 'Not Found' });
        }
        res.status(200).send({ article });
      })
      .catch(err => next(err));
  }
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id)
    .then((articlesBeingDeleted) => {
      if (articlesBeingDeleted === 0) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
      }
      if (articlesBeingDeleted === 1) res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendArticleComments = (req, res, next) => {
  const { sort_by, order, limit } = req.query;
  const { article_id } = req.params;
  getArticleComments(article_id, order, sort_by, limit)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewComment = (req, res, next) => {
  const newComment = req.body;
  const { id } = req.params;
  console.log(newComment);
  getUserByUsername(req.body.author).then((res) => {
    if (res.length === 0) {
      next({ status: 422, msg: 'UNPROCESSABLE ENTITY' });
    }
  });

  newComment.article_id = req.params.article_id;
  console.log(newComment);
  addNewComment(newComment)
    .then((comment) => {
      console.log(comment);
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArticleVotes = (req, res, next) => {
  const votes = req.body;

  const { article_id } = req.params;
  if (votes.incVotes > 0) {
    updateVotes(article_id, votes)
      .then(([updateVotes]) => {
        res.status(200).send({ updateVotes });
      })
      .catch((err) => {
        next(err);
      });
  } else if (votes.incVotes < 0) {
    decrementVotes(article_id, votes)
      .then(([updateVotes]) => {
        res.status(200).send({ updateVotes });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    const { article_id } = req.params;
    return getArticleByArticleId(article_id)
      .then((unchangedVotes) => {
        res.status(200).send({ unchangedVotes });
      })

      .catch((err) => {
        next(err);
      });
  }
};
