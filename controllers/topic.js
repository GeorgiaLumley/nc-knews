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
    .then((topic) => {
      if (topic[0].slug === undefined || topic[0].description === undefined) {
        return Promise.reject({ msg: 'Bad Request' });
      }
      const slug = validateSlug(topic);
      if (slug === 'err') {
        return Promise.reject({ msg: 'Bad Request' });
      }
      res.status(201).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};
