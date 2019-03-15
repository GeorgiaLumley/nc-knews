const { getTopics, addNewTopic } = require('../models/topic');
const { validateSlug } = require('../utils/index');

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postTopic = (req, res, next) => {
  addNewTopic(req.body)
    .then(([topic]) => {
      if (topic.slug === undefined || topic.description === undefined) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
      }
      const slug = validateSlug(topic);
      if (slug === 'err') {
        return Promise.reject({ status: 422, msg: 'Unprocessable Entity' });
      }

      res.status(201).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};
